import {
  SESSION_COOKIE,
  REFRESH_COOKIE,
  USER_COOKIE,
  LEGACY_KEYS,
  DEFAULT_MAX_AGE,
  REMEMBER_MAX_AGE,
  sessionMaxAge,
  pickUser,
} from './constants';

describe('session/constants', () => {
  describe('cookie names', () => {
    it('are stable, distinct, jp_-prefixed strings', () => {
      const names = [SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE];
      names.forEach((name) => expect(name).toMatch(/^jp_/));
      expect(new Set(names).size).toBe(3); // all distinct
    });

    it('maps the legacy localStorage keys', () => {
      expect(LEGACY_KEYS).toEqual({
        token: 'token',
        refreshToken: 'refreshToken',
        user: 'user',
      });
    });
  });

  describe('sessionMaxAge', () => {
    it('returns the short TTL when remember is false', () => {
      expect(sessionMaxAge(false)).toBe(DEFAULT_MAX_AGE);
    });

    it('returns the long TTL when remember is true', () => {
      expect(sessionMaxAge(true)).toBe(REMEMBER_MAX_AGE);
    });

    it('treats undefined as not-remembered', () => {
      expect(sessionMaxAge()).toBe(DEFAULT_MAX_AGE);
    });

    it('remember TTL is longer than the default TTL', () => {
      expect(REMEMBER_MAX_AGE).toBeGreaterThan(DEFAULT_MAX_AGE);
    });
  });

  describe('pickUser', () => {
    it('maps a full backend payload to the UI user shape', () => {
      const payload = {
        id_token: 'secret',
        refresh_token: 'secret',
        user_id: 42,
        email: 'a@b.com',
        role: 'recruiter',
        recruiter_id: 7,
      };
      expect(pickUser(payload)).toEqual({
        id: 42,
        email: 'a@b.com',
        role: 'recruiter',
        recruiter_id: 7,
      });
    });

    it('never leaks token fields into the user object', () => {
      const user = pickUser({ id_token: 't', refresh_token: 'r', user_id: 1 });
      expect(user).not.toHaveProperty('id_token');
      expect(user).not.toHaveProperty('refresh_token');
    });

    it('uses the fallback email when the payload omits one', () => {
      const user = pickUser({ user_id: 1, role: 'user' }, 'fallback@b.com');
      expect(user.email).toBe('fallback@b.com');
    });

    it('prefers the payload email over the fallback', () => {
      const user = pickUser({ email: 'real@b.com' }, 'fallback@b.com');
      expect(user.email).toBe('real@b.com');
    });

    it('returns null for an empty payload', () => {
      expect(pickUser({})).toBeNull();
    });

    it('returns null for a nullish payload', () => {
      expect(pickUser(null)).toBeNull();
      expect(pickUser(undefined)).toBeNull();
    });

    it('omits fields that are absent', () => {
      expect(pickUser({ user_id: 5 })).toEqual({ id: 5 });
    });
  });
});
