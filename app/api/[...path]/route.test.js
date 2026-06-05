/**
 * @jest-environment node
 */
// Node env so Headers/fetch are global (jsdom lacks them). next/server and the
// backend config are mocked.

jest.mock('next/server', () => {
  class NextResponse {
    constructor(body, init = {}) {
      this.body = body;
      this.status = init.status;
      this.headers = init.headers;
      this.cookies = { set: jest.fn() };
    }
    static json(body, init = {}) {
      const res = new NextResponse(body, init);
      res.status = init.status ?? 200;
      res.json = async () => body;
      return res;
    }
  }
  return { NextResponse };
});

jest.mock('../../../lib/server/config', () => ({
  serverConfig: { backendUrl: 'http://backend.test' },
}));

import { GET, POST } from './route';
import { SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE, REMEMBER_MAX_AGE } from '../../../lib/session/constants';

function makeReq({ method = 'GET', path = '/jobs', search = '', headers = {}, cookies = {}, body = null }) {
  return {
    method,
    nextUrl: { pathname: `/api${path}`, search },
    headers: new Headers(headers),
    cookies: { get: (n) => (n in cookies ? { value: cookies[n] } : undefined) },
    arrayBuffer: async () => {
      if (body == null) return new ArrayBuffer(0);
      const str = typeof body === 'string' ? body : JSON.stringify(body);
      return new TextEncoder().encode(str).buffer;
    },
  };
}

function upstreamJson(body, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    headers: new Headers({ 'content-type': 'application/json' }),
    text: async () => JSON.stringify(body),
    arrayBuffer: async () => new TextEncoder().encode(JSON.stringify(body)).buffer,
  };
}

function upstreamRaw(text, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    headers: new Headers({ 'content-type': 'text/plain' }),
    text: async () => text,
    arrayBuffer: async () => new TextEncoder().encode(text).buffer,
  };
}

const LOGIN_PAYLOAD = {
  id_token: 'ACCESS',
  refresh_token: 'REFRESH',
  user_id: 1,
  email: 'a@b.com',
  role: 'recruiter',
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('proxy — request forwarding', () => {
  it('strips the /api prefix and targets the backend with the query string', async () => {
    global.fetch.mockResolvedValue(upstreamRaw('[]'));
    await GET(makeReq({ path: '/jobs', search: '?page=2' }));
    expect(global.fetch).toHaveBeenCalledWith('http://backend.test/jobs?page=2', expect.any(Object));
  });

  it('injects Bearer from the httpOnly session cookie when no Authorization is sent', async () => {
    global.fetch.mockResolvedValue(upstreamRaw('[]'));
    await GET(makeReq({ path: '/jobs', cookies: { [SESSION_COOKIE]: 'tok' } }));
    const init = global.fetch.mock.calls[0][1];
    expect(init.headers.get('authorization')).toBe('Bearer tok');
  });

  it('does not override an explicit Authorization header', async () => {
    global.fetch.mockResolvedValue(upstreamRaw('[]'));
    await GET(
      makeReq({
        path: '/jobs',
        headers: { authorization: 'Bearer explicit' },
        cookies: { [SESSION_COOKIE]: 'cookie-tok' },
      }),
    );
    expect(global.fetch.mock.calls[0][1].headers.get('authorization')).toBe('Bearer explicit');
  });

  it('passes non-auth responses through with their status', async () => {
    global.fetch.mockResolvedValue(upstreamRaw('hello', { status: 201 }));
    const res = await GET(makeReq({ path: '/jobs' }));
    expect(res.status).toBe(201);
    expect(new TextDecoder().decode(res.body)).toBe('hello');
  });

  it('returns 502 when the upstream is unreachable', async () => {
    global.fetch.mockRejectedValue(new Error('ECONNREFUSED'));
    const res = await GET(makeReq({ path: '/jobs' }));
    expect(res.status).toBe(502);
    expect(res.body.detail).toMatch(/unavailable/i);
  });
});

describe('proxy — auth responses set httpOnly cookies', () => {
  it('lifts tokens into httpOnly cookies and strips them from the body', async () => {
    global.fetch.mockResolvedValue(upstreamJson(LOGIN_PAYLOAD));
    const res = await POST(makeReq({ method: 'POST', path: '/auth/login', body: { email: 'a@b.com' } }));

    // tokens removed from the JS-visible body...
    expect(res.body).not.toHaveProperty('id_token');
    expect(res.body).not.toHaveProperty('refresh_token');
    // ...but the non-sensitive fields remain for the UI
    expect(res.body).toMatchObject({ user_id: 1, role: 'recruiter' });

    // three httpOnly cookies written
    const names = res.cookies.set.mock.calls.map((c) => c[0]);
    expect(names).toEqual(expect.arrayContaining([SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE]));
    const sessionCall = res.cookies.set.mock.calls.find((c) => c[0] === SESSION_COOKIE);
    expect(sessionCall[1]).toBe('ACCESS');
    expect(sessionCall[2].httpOnly).toBe(true);
  });

  it('uses the long cookie TTL when the login body has remember=true', async () => {
    global.fetch.mockResolvedValue(upstreamJson(LOGIN_PAYLOAD));
    const res = await POST(
      makeReq({ method: 'POST', path: '/auth/login', body: { email: 'a@b.com', remember: true } }),
    );
    const sessionCall = res.cookies.set.mock.calls.find((c) => c[0] === SESSION_COOKIE);
    expect(sessionCall[2].maxAge).toBe(REMEMBER_MAX_AGE);
  });

  it('passes a tokenless auth response (e.g. signup) through without setting cookies', async () => {
    global.fetch.mockResolvedValue(upstreamJson({ message: 'check your email' }));
    const res = await POST(
      makeReq({ method: 'POST', path: '/auth/candidate/register', body: { email: 'a@b.com' } }),
    );
    expect(res.body).toEqual({ message: 'check your email' });
    expect(res.cookies.set).not.toHaveBeenCalled();
  });
});
