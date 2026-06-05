// Client-side session persistence, used in direct mode (browser talks to
// FastAPI directly, no Next server to set httpOnly cookies). JS can't write
// httpOnly cookies, so this is the less-secure dev path: we write a normal
// cookie (not localStorage) so a refresh can rehydrate the in-memory store.
// clear() also wipes the old localStorage keys from the previous scheme.

import {
  SESSION_COOKIE,
  REFRESH_COOKIE,
  USER_COOKIE,
  LEGACY_KEYS,
  sessionMaxAge,
} from './constants';

const isBrowser = () => typeof window !== 'undefined';

function setCookie(name, value, maxAge) {
  if (!isBrowser()) return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie =
    `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function getCookie(name) {
  if (!isBrowser()) return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function setTokens({ token, refreshToken, remember = false } = {}) {
  const maxAge = sessionMaxAge(remember);
  if (token) setCookie(SESSION_COOKIE, token, maxAge);
  if (refreshToken) setCookie(REFRESH_COOKIE, refreshToken, maxAge);
}

export function setUser(user, { remember = false } = {}) {
  if (!user) return;
  setCookie(USER_COOKIE, JSON.stringify(user), sessionMaxAge(remember));
}

export function getToken() {
  return getCookie(SESSION_COOKIE);
}

export function getRefreshToken() {
  return getCookie(REFRESH_COOKIE);
}

export function getUser() {
  const raw = getCookie(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clear() {
  [SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE].forEach(deleteCookie);
  if (isBrowser()) {
    Object.values(LEGACY_KEYS).forEach((key) => localStorage.removeItem(key));
  }
}
