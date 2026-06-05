// Lightweight NextResponse so we don't need the full web-Response globals.
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init) => ({
      body,
      status: init?.status ?? 200,
      cookies: { set: jest.fn() },
    }),
  },
}));

import { GET, DELETE, POST } from './route';
import { SESSION_COOKIE, USER_COOKIE } from '../../../lib/session/constants';

function reqWith(cookies) {
  return {
    cookies: { get: (name) => (name in cookies ? { value: cookies[name] } : undefined) },
  };
}

describe('GET /api/session (hydrate)', () => {
  it('reports an authenticated session and returns the user', async () => {
    const req = reqWith({
      [SESSION_COOKIE]: 'tok',
      [USER_COOKIE]: JSON.stringify({ id: 1, role: 'recruiter' }),
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      authenticated: true,
      user: { id: 1, role: 'recruiter' },
    });
  });

  it('reports no session when cookies are absent', async () => {
    const res = await GET(reqWith({}));
    expect(res.body).toEqual({ authenticated: false, user: null });
  });
});

describe('DELETE/POST /api/session (logout)', () => {
  it('DELETE returns ok and expires the session cookies', () => {
    const res = DELETE();
    expect(res.body).toEqual({ ok: true });
    // session + refresh + user: three cookie writes, all expiring
    expect(res.cookies.set).toHaveBeenCalledTimes(3);
  });

  it('POST behaves identically to DELETE', () => {
    const res = POST();
    expect(res.body).toEqual({ ok: true });
    expect(res.cookies.set).toHaveBeenCalledTimes(3);
  });
});
