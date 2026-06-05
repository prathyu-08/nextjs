import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Control the session via the hook the component consumes.
const mockUseSession = jest.fn();
jest.mock('../../../lib/session/SessionProvider', () => ({
  useSession: () => mockUseSession(),
}));

import Navbar from './Navbar';

const logout = jest.fn().mockResolvedValue(undefined);

function setSession({ user = null, isAuthenticated = false } = {}) {
  mockUseSession.mockReturnValue({ user, isAuthenticated, logout });
}

describe('Navbar', () => {
  it('shows Sign in / Register when logged out', () => {
    setSession({ isAuthenticated: false });
    render(<Navbar />);
    expect(screen.getAllByText('Sign in').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Register').length).toBeGreaterThan(0);
  });

  it('shows the profile + Employer nav for a recruiter', () => {
    setSession({ isAuthenticated: true, user: { email: 'rec@co.com', role: 'recruiter' } });
    render(<Navbar />);
    expect(screen.getAllByText('rec@co.com').length).toBeGreaterThan(0);
    expect(screen.getByText('Employer')).toBeInTheDocument();
    expect(screen.queryByText('Candidate')).not.toBeInTheDocument();
  });

  it('shows the Candidate nav (not Employer) for a candidate', () => {
    setSession({ isAuthenticated: true, user: { email: 'me@co.com', role: 'user' } });
    render(<Navbar />);
    expect(screen.getByText('Candidate')).toBeInTheDocument();
    expect(screen.queryByText('Employer')).not.toBeInTheDocument();
  });

  it('logs out and redirects home', async () => {
    const user = userEvent.setup();
    setSession({ isAuthenticated: true, user: { email: 'me@co.com', role: 'user' } });
    render(<Navbar />);

    // The desktop logout button only renders once the profile menu is hovered.
    // Use fireEvent for the click so pointer movement doesn't re-close the menu.
    await user.hover(screen.getByRole('button', { name: /me@co\.com/i }));
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(logout).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(global.__router.push).toHaveBeenCalledWith('/'));
  });
});
