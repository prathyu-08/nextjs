// In-memory session store — the source the running app reads from. It lives
// only in the current JS heap and is wiped on a full refresh, which is the
// point: tokens never sit in localStorage. The durable copy is the httpOnly
// cookie, and SessionProvider re-hydrates this on mount.
//
// `hydrated` separates "haven't checked yet" (false) from "checked, no session"
// (true with user === null).

let state = {
  user: null,
  token: null, // only set in direct mode; null in proxy mode
  hydrated: false,
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener(state));
}

export function clearState() {
  setState({ user: null, token: null, hydrated: true });
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
