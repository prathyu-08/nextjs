// Cookie names and TTLs shared by the client (lib/session) and server
// (lib/server/session) halves. Same names on both sides so a session created
// in either mode is read back through the same keys. No runtime-specific APIs
// here so it's safe to import anywhere.

export const SESSION_COOKIE = 'jp_session';
export const REFRESH_COOKIE = 'jp_refresh';
export const USER_COOKIE = 'jp_user';

// Old localStorage keys, cleared on logout so stale sessions don't linger.
export const LEGACY_KEYS = {
  token: 'token',
  refreshToken: 'refreshToken',
  user: 'user',
};

export const DEFAULT_MAX_AGE = 60 * 60 * 8; // 8h
export const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30; // 30d

export function sessionMaxAge(remember) {
  return remember ? REMEMBER_MAX_AGE : DEFAULT_MAX_AGE;
}

// Map a FastAPI auth payload to the non-sensitive user object the UI needs.
// Returns null if there's nothing useful in it.
export function pickUser(payload, fallbackEmail) {
  if (!payload) return null;
  const user = {};
  if (payload.user_id != null) user.id = payload.user_id;
  if (payload.email != null || fallbackEmail) user.email = payload.email || fallbackEmail;
  if (payload.role != null) user.role = payload.role;
  if (payload.recruiter_id != null) user.recruiter_id = payload.recruiter_id;
  return Object.keys(user).length ? user : null;
}
