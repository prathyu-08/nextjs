import {
  setTokens,
  setUser,
  getToken,
  getRefreshToken,
  getUser,
  clear,
} from './client';
import {
  SESSION_COOKIE,
  REFRESH_COOKIE,
  USER_COOKIE,
  LEGACY_KEYS,
  REMEMBER_MAX_AGE,
} from './constants';

// Wipe jsdom cookies + storage between tests.
function wipeCookies() {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name) document.cookie = `${name}=; Path=/; Max-Age=0`;
  });
}

beforeEach(() => {
  wipeCookies();
  localStorage.clear();
});

describe('session/client (direct mode persistence)', () => {
  describe('setTokens', () => {
    it('writes the access + refresh tokens to cookies', () => {
      setTokens({ token: 'access', refreshToken: 'refresh' });
      expect(getToken()).toBe('access');
      expect(getRefreshToken()).toBe('refresh');
    });

    it('round-trips a URL-unsafe token value', () => {
      setTokens({ token: 'a b;c=d' });
      expect(getToken()).toBe('a b;c=d');
    });

    it('does NOT write tokens to localStorage (httpOnly-only policy)', () => {
      setTokens({ token: 'access', refreshToken: 'refresh' });
      expect(localStorage.getItem(LEGACY_KEYS.token)).toBeNull();
      expect(localStorage.getItem(LEGACY_KEYS.refreshToken)).toBeNull();
    });

    it('skips missing fields', () => {
      setTokens({ token: 'only-access' });
      expect(getToken()).toBe('only-access');
      expect(getRefreshToken()).toBeNull();
    });

    it('honors the remember TTL in the Set-Cookie attributes', () => {
      // jsdom exposes Max-Age only on write; assert via a spy on document.cookie.
      const spy = jest.spyOn(document, 'cookie', 'set');
      setTokens({ token: 'access', remember: true });
      expect(spy).toHaveBeenCalledWith(expect.stringContaining(`Max-Age=${REMEMBER_MAX_AGE}`));
      spy.mockRestore();
    });
  });

  describe('setUser / getUser', () => {
    it('round-trips a user object as JSON', () => {
      const user = { id: 1, email: 'a@b.com', role: 'user' };
      setUser(user);
      expect(getUser()).toEqual(user);
    });

    it('ignores a nullish user', () => {
      setUser(null);
      expect(getUser()).toBeNull();
    });

    it('returns null when no user cookie is present', () => {
      expect(getUser()).toBeNull();
    });

    it('returns null for a corrupted user cookie instead of throwing', () => {
      document.cookie = `${USER_COOKIE}=not-json; Path=/`;
      expect(() => getUser()).not.toThrow();
      expect(getUser()).toBeNull();
    });
  });

  describe('clear', () => {
    it('removes all session cookies', () => {
      setTokens({ token: 'a', refreshToken: 'r' });
      setUser({ id: 1 });
      clear();
      expect(getToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
      expect(getUser()).toBeNull();
    });

    it('also purges leftover legacy localStorage keys', () => {
      localStorage.setItem(LEGACY_KEYS.token, 'old');
      localStorage.setItem(LEGACY_KEYS.user, '{}');
      clear();
      expect(localStorage.getItem(LEGACY_KEYS.token)).toBeNull();
      expect(localStorage.getItem(LEGACY_KEYS.user)).toBeNull();
    });
  });

  it('uses the documented cookie names', () => {
    setTokens({ token: 'a', refreshToken: 'r' });
    setUser({ id: 1 });
    expect(document.cookie).toContain(`${SESSION_COOKIE}=`);
    expect(document.cookie).toContain(`${REFRESH_COOKIE}=`);
    expect(document.cookie).toContain(`${USER_COOKIE}=`);
  });
});
