import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the facade but let it drive the real in-memory store, so the provider's
// subscribe-and-rerender wiring is exercised end to end.
jest.mock('./index', () => {
  const memory = require('./memory');
  return {
    __esModule: true,
    default: {
      mode: 'proxy',
      hydrate: jest.fn(async () => {
        memory.setState({ user: { email: 'a@b.com', role: 'user' }, hydrated: true });
      }),
      start: jest.fn((data) => {
        memory.setState({ user: data.user, token: data.token ?? null, hydrated: true });
      }),
      end: jest.fn(async () => {
        memory.setState({ user: null, token: null, hydrated: true });
      }),
    },
  };
});

import { SessionProvider, useSession } from './SessionProvider';
import session from './index';
import * as memory from './memory';

function Consumer() {
  const { user, isAuthenticated, loading, login, logout } = useSession();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <span data-testid="email">{user?.email ?? 'none'}</span>
      <button onClick={() => login({ user: { email: 'new@b.com' } })}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <SessionProvider>
      <Consumer />
    </SessionProvider>,
  );
}

beforeEach(() => {
  memory.setState({ user: null, token: null, hydrated: false });
  jest.clearAllMocks();
});

describe('SessionProvider / useSession', () => {
  it('hydrates the session on mount and re-renders with the user', async () => {
    renderProvider();
    expect(session.hydrate).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));
    expect(screen.getByTestId('email')).toHaveTextContent('a@b.com');
    expect(screen.getByTestId('auth')).toHaveTextContent('true');
  });

  it('exposes loading=true until hydration resolves', async () => {
    // Hold hydration open so we can observe the pending (loading) state.
    let resolveHydrate;
    session.hydrate.mockImplementationOnce(() => new Promise((r) => { resolveHydrate = r; }));
    memory.setState({ user: null, token: null, hydrated: false });

    renderProvider();
    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    // Resolving hydration flips loading to false.
    await act(async () => {
      memory.setState({ user: { email: 'a@b.com' }, hydrated: true });
      resolveHydrate();
    });
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('login() updates every consumer through the store', async () => {
    const user = userEvent.setup();
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));

    await user.click(screen.getByText('login'));

    expect(session.start).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('email')).toHaveTextContent('new@b.com');
  });

  it('logout() clears the user', async () => {
    const user = userEvent.setup();
    renderProvider();
    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('true'));

    await user.click(screen.getByText('logout'));

    expect(session.end).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('false'));
    expect(screen.getByTestId('email')).toHaveTextContent('none');
  });

  it('throws if useSession is used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/useSession must be used within/);
    spy.mockRestore();
  });
});
