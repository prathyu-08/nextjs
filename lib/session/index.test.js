import { SESSION_COOKIE, USER_COOKIE } from './constants';

// Load the facade with a chosen API_MODE. resetModules gives a fresh in-memory
// store (and fresh client cookie helpers) for each test.
function load(mode) {
  jest.resetModules();
  jest.doMock('../config', () => ({
    API_MODE: mode,
    DIRECT_API_URL: 'http://localhost:8000',
    PROXY_BASE: '/api',
  }));
  const session = require('./index').default;
  const memory = require('./memory');
  const client = require('./client');
  return { session, memory, client };
}

function wipeCookies() {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name) document.cookie = `${name}=; Path=/; Max-Age=0`;
  });
}

beforeEach(() => {
  wipeCookies();
  localStorage.clear();
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

const USER = { id: 1, email: 'a@b.com', role: 'recruiter' };

describe('session facade — proxy mode', () => {
  it('exposes mode = proxy', () => {
    const { session } = load('proxy');
    expect(session.mode).toBe('proxy');
  });

  it('start() seeds the in-memory user but writes NO client cookies', () => {
    const { session, memory } = load('proxy');
    session.start({ token: 'access', refreshToken: 'refresh', user: USER });

    expect(memory.getState().user).toEqual(USER);
    expect(memory.getState().token).toBeNull(); // tokens are httpOnly, never in JS
    expect(memory.getState().hydrated).toBe(true);
    expect(document.cookie).not.toContain(SESSION_COOKIE);
  });

  it('getToken() is always null (the httpOnly cookie auto-rides /api calls)', () => {
    const { session } = load('proxy');
    session.start({ token: 'access', user: USER });
    expect(session.getToken()).toBeNull();
  });

  it('isAuthenticated() reflects the in-memory user', () => {
    const { session } = load('proxy');
    expect(session.isAuthenticated()).toBe(false);
    session.start({ user: USER });
    expect(session.isAuthenticated()).toBe(true);
  });

  it('hydrate() pulls the user from GET /api/session', async () => {
    const { session, memory } = load('proxy');
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ authenticated: true, user: USER }),
    });

    await session.hydrate();

    expect(global.fetch).toHaveBeenCalledWith('/api/session', expect.any(Object));
    expect(memory.getState().user).toEqual(USER);
    expect(memory.getState().hydrated).toBe(true);
  });

  it('hydrate() is a no-op once hydrated unless forced', async () => {
    const { session } = load('proxy');
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ user: USER }) });

    await session.hydrate();
    await session.hydrate(); // already hydrated, so skipped
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await session.hydrate(true); // forced, fetches again
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('hydrate() marks hydrated with a null user when the server says no session', async () => {
    const { session, memory } = load('proxy');
    global.fetch.mockResolvedValue({ ok: false, json: async () => ({}) });

    await session.hydrate();
    expect(memory.getState().user).toBeNull();
    expect(memory.getState().hydrated).toBe(true);
  });

  it('hydrate() swallows network errors and still hydrates', async () => {
    const { session, memory } = load('proxy');
    global.fetch.mockRejectedValue(new Error('offline'));

    await expect(session.hydrate()).resolves.toBeDefined();
    expect(memory.getState().hydrated).toBe(true);
    expect(memory.getState().user).toBeNull();
  });

  it('end() clears memory and asks the server to expire the cookies', async () => {
    const { session, memory } = load('proxy');
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    session.start({ user: USER });

    await session.end();

    expect(memory.getState().user).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('/api/session', { method: 'DELETE' });
  });
});

describe('session facade — direct mode', () => {
  it('exposes mode = direct', () => {
    const { session } = load('direct');
    expect(session.mode).toBe('direct');
  });

  it('start() persists tokens to cookies AND seeds memory', () => {
    const { session, memory } = load('direct');
    session.start({ token: 'access', refreshToken: 'refresh', user: USER });

    expect(memory.getState().token).toBe('access');
    expect(memory.getState().user).toEqual(USER);
    expect(document.cookie).toContain(`${SESSION_COOKIE}=`);
    expect(document.cookie).toContain(`${USER_COOKIE}=`);
  });

  it('getToken() returns the real token from memory', () => {
    const { session } = load('direct');
    session.start({ token: 'access', user: USER });
    expect(session.getToken()).toBe('access');
  });

  it('getToken() falls back to the cookie when memory is empty (post-refresh)', () => {
    const { session, client } = load('direct');
    client.setTokens({ token: 'from-cookie' }); // memory is still empty here
    expect(session.getToken()).toBe('from-cookie');
  });

  it('hydrate() rebuilds memory from the cookie without hitting the network', async () => {
    const { session, memory, client } = load('direct');
    client.setTokens({ token: 'access' });
    client.setUser(USER);

    await session.hydrate();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(memory.getState().user).toEqual(USER);
    expect(memory.getState().token).toBe('access');
    expect(memory.getState().hydrated).toBe(true);
  });

  it('end() clears cookies + memory and does NOT call the server', async () => {
    const { session, memory } = load('direct');
    session.start({ token: 'access', user: USER });

    await session.end();

    expect(memory.getState().user).toBeNull();
    expect(document.cookie).not.toContain(SESSION_COOKIE);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
