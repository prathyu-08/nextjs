import {
  writeSessionCookies,
  clearSessionCookies,
  readSessionToken,
  readSessionUser,
  hasSession,
} from './session';
import {
  SESSION_COOKIE,
  REFRESH_COOKIE,
  USER_COOKIE,
  DEFAULT_MAX_AGE,
  REMEMBER_MAX_AGE,
} from '../session/constants';

// Minimal NextResponse-like stub that records cookies.set(...) calls.
function makeRes() {
  const calls = [];
  return {
    cookies: { set: (name, value, opts) => calls.push({ name, value, opts }) },
    calls,
    get(name) {
      return this.calls.filter((c) => c.name === name).pop();
    },
  };
}

// Minimal NextRequest-like stub.
function reqWith(cookies) {
  return {
    cookies: { get: (name) => (name in cookies ? { value: cookies[name] } : undefined) },
  };
}

const PAYLOAD = {
  id_token: 'ACCESS_TOKEN',
  refresh_token: 'REFRESH_TOKEN',
  user_id: 9,
  email: 'a@b.com',
  role: 'recruiter',
  recruiter_id: 3,
};

describe('server/session — writeSessionCookies', () => {
  it('writes session, refresh and user cookies from a full payload', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD);

    expect(res.get(SESSION_COOKIE).value).toBe('ACCESS_TOKEN');
    expect(res.get(REFRESH_COOKIE).value).toBe('REFRESH_TOKEN');
    expect(JSON.parse(res.get(USER_COOKIE).value)).toEqual({
      id: 9,
      email: 'a@b.com',
      role: 'recruiter',
      recruiter_id: 3,
    });
  });

  it('marks ALL three cookies httpOnly (the httpOnly-only policy)', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD);
    [SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE].forEach((name) => {
      expect(res.get(name).opts.httpOnly).toBe(true);
    });
  });

  it('never writes raw tokens into the user cookie', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD);
    expect(res.get(USER_COOKIE).value).not.toContain('ACCESS_TOKEN');
    expect(res.get(USER_COOKIE).value).not.toContain('REFRESH_TOKEN');
  });

  it('uses sameSite=lax and (in test env) Secure=false', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD);
    const opts = res.get(SESSION_COOKIE).opts;
    expect(opts.sameSite).toBe('lax');
    expect(opts.secure).toBe(false); // NODE_ENV=test
    expect(opts.path).toBe('/');
  });

  it('applies the default TTL when remember is false', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD, { remember: false });
    expect(res.get(SESSION_COOKIE).opts.maxAge).toBe(DEFAULT_MAX_AGE);
  });

  it('applies the long TTL when remember is true', () => {
    const res = makeRes();
    writeSessionCookies(res, PAYLOAD, { remember: true });
    expect(res.get(SESSION_COOKIE).opts.maxAge).toBe(REMEMBER_MAX_AGE);
  });

  it('skips cookies for fields the payload omits', () => {
    const res = makeRes();
    writeSessionCookies(res, { id_token: 'only' });
    expect(res.get(SESSION_COOKIE)).toBeDefined();
    expect(res.get(REFRESH_COOKIE)).toBeUndefined();
    expect(res.get(USER_COOKIE)).toBeUndefined();
  });

  it('is a no-op for a nullish payload', () => {
    const res = makeRes();
    writeSessionCookies(res, null);
    expect(res.calls).toHaveLength(0);
  });

  it('honors a fallback email', () => {
    const res = makeRes();
    writeSessionCookies(res, { id_token: 't', user_id: 1 }, { fallbackEmail: 'fb@b.com' });
    expect(JSON.parse(res.get(USER_COOKIE).value).email).toBe('fb@b.com');
  });
});

describe('server/session — clearSessionCookies', () => {
  it('expires all three cookies (maxAge 0)', () => {
    const res = makeRes();
    clearSessionCookies(res);
    [SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE].forEach((name) => {
      expect(res.get(name).opts.maxAge).toBe(0);
      expect(res.get(name).value).toBe('');
    });
  });
});

describe('server/session — readers', () => {
  it('readSessionToken returns the token cookie value', () => {
    expect(readSessionToken(reqWith({ [SESSION_COOKIE]: 'tok' }))).toBe('tok');
  });

  it('readSessionToken returns null when absent', () => {
    expect(readSessionToken(reqWith({}))).toBeNull();
  });

  it('readSessionUser parses the user cookie JSON', () => {
    const req = reqWith({ [USER_COOKIE]: JSON.stringify({ id: 1, role: 'user' }) });
    expect(readSessionUser(req)).toEqual({ id: 1, role: 'user' });
  });

  it('readSessionUser returns null for a corrupt cookie instead of throwing', () => {
    const req = reqWith({ [USER_COOKIE]: 'not-json' });
    expect(() => readSessionUser(req)).not.toThrow();
    expect(readSessionUser(req)).toBeNull();
  });

  it('readSessionUser returns null when absent', () => {
    expect(readSessionUser(reqWith({}))).toBeNull();
  });

  it('hasSession reflects the presence of the token cookie', () => {
    expect(hasSession(reqWith({ [SESSION_COOKIE]: 'tok' }))).toBe(true);
    expect(hasSession(reqWith({}))).toBe(false);
  });
});

describe('server/session — production hardening', () => {
  const OLD_ENV = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = OLD_ENV;
    jest.resetModules();
  });

  it('marks cookies Secure when NODE_ENV=production', () => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';
    const { writeSessionCookies: writeProd } = require('./session');
    const res = makeRes();
    writeProd(res, PAYLOAD);
    expect(res.get(SESSION_COOKIE).opts.secure).toBe(true);
  });
});
