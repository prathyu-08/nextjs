'use client';

// React binding over the session facade. Mounted once near the root
// (app/layout.jsx). Hydrates the store on mount so a refresh restores the
// session, and subscribes so a login/logout anywhere re-renders consumers.
//
//   const { user, isAuthenticated, loading, login, logout } = useSession();

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import session from './index';
import { getState, subscribe } from './memory';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [state, setLocalState] = useState(getState);

  useEffect(() => {
    const unsubscribe = subscribe(setLocalState);
    session.hydrate();
    return unsubscribe;
  }, []);

  const login = useCallback((data) => {
    session.start(data);
  }, []);

  const logout = useCallback(async () => {
    await session.end();
  }, []);

  const refresh = useCallback(() => session.hydrate(true), []);

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: !!state.user,
    loading: !state.hydrated, // gate auth-dependent UI on this
    mode: session.mode,
    login,
    logout,
    refresh,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a <SessionProvider>');
  }
  return ctx;
}
