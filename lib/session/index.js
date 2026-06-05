import { API_MODE } from '../config';
import * as clientSession from './client';
import { getState, setState, clearState } from './memory';

// Facade used by the app to read/write the session. Most components go through
// the useSession() hook in ./SessionProvider, which wraps this.
//
// proxy mode: tokens live in httpOnly cookies set by the /api proxy; JS can't
// read them, so getToken() is null and hydrate() asks the server for the user.
// direct mode: tokens live in a JS cookie + memory and getToken() returns them.

const isProxy = API_MODE === 'proxy';

const session = {
  mode: API_MODE,

  start({ token, refreshToken, user, remember = false } = {}) {
    // In proxy mode the cookies were already set by the proxy, so just seed
    // the in-memory user. In direct mode we own the tokens too.
    if (!isProxy) {
      clientSession.setTokens({ token, refreshToken, remember });
      clientSession.setUser(user, { remember });
    }
    setState({
      user: user || null,
      token: isProxy ? null : token || null,
      hydrated: true,
    });
  },

  // Rebuild the store from the durable source of truth. Runs on every mount
  // (i.e. after a refresh). Skips the work if already hydrated.
  async hydrate(force = false) {
    if (getState().hydrated && !force) return getState();

    if (isProxy) {
      try {
        const res = await fetch('/api/session', { headers: { Accept: 'application/json' } });
        const data = res.ok ? await res.json() : null;
        setState({ user: data?.user || null, token: null, hydrated: true });
      } catch {
        setState({ user: null, token: null, hydrated: true });
      }
    } else {
      setState({
        user: clientSession.getUser(),
        token: clientSession.getToken(),
        hydrated: true,
      });
    }
    return getState();
  },

  getToken() {
    if (isProxy) return null;
    return getState().token || clientSession.getToken();
  },

  getUser() {
    return getState().user;
  },

  isAuthenticated() {
    return !!getState().user;
  },

  async end() {
    clientSession.clear();
    clearState();
    // Proxy cookies are httpOnly, so only the server can expire them.
    if (isProxy && typeof window !== 'undefined') {
      try {
        await fetch('/api/session', { method: 'DELETE' });
      } catch {
        // already cleared locally; a failed call here doesn't matter
      }
    }
  },
};

export default session;
export { session };
