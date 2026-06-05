// Server-side session helpers, used by the /api proxy in proxy mode: turn a
// FastAPI auth response into httpOnly cookies, read the token back out of a
// request to forward it upstream, and expire everything on logout.
//
// Server-only — never import from a client component. httpOnly cookies are
// invisible to document.cookie (so XSS can't steal them) but still ride along
// on same-origin requests, which is how the proxy reads them back.

import {
  SESSION_COOKIE,
  REFRESH_COOKIE,
  USER_COOKIE,
  sessionMaxAge,
  pickUser,
} from '../session/constants';

const isProd = process.env.NODE_ENV === 'production';

function baseOptions(maxAge) {
  return {
    path: '/',
    sameSite: 'lax',
    secure: isProd, // no Secure on http://localhost or dev cookies won't stick
    maxAge,
  };
}

// All three cookies are httpOnly, including the user one — the UI gets the user
// from GET /api/session, never by reading a cookie. fallbackEmail covers logins
// where the response omits the email.
export function writeSessionCookies(res, payload, { remember = false, fallbackEmail } = {}) {
  if (!payload) return res;
  const opts = baseOptions(sessionMaxAge(remember));

  if (payload.id_token) {
    res.cookies.set(SESSION_COOKIE, payload.id_token, { ...opts, httpOnly: true });
  }
  if (payload.refresh_token) {
    res.cookies.set(REFRESH_COOKIE, payload.refresh_token, { ...opts, httpOnly: true });
  }
  const user = pickUser(payload, fallbackEmail);
  if (user) {
    res.cookies.set(USER_COOKIE, JSON.stringify(user), { ...opts, httpOnly: true });
  }
  return res;
}

export function clearSessionCookies(res) {
  [SESSION_COOKIE, REFRESH_COOKIE, USER_COOKIE].forEach((name) => {
    res.cookies.set(name, '', { path: '/', maxAge: 0, sameSite: 'lax', secure: isProd });
  });
  return res;
}

export function readSessionToken(req) {
  return req.cookies.get(SESSION_COOKIE)?.value || null;
}

export function readSessionUser(req) {
  const raw = req.cookies.get(USER_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function hasSession(req) {
  return !!readSessionToken(req);
}
