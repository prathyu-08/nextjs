import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';

const mockLogin = jest.fn();

jest.mock('../../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      login: jest.fn(),
    },
  },
}));

jest.mock('../../../../lib/session/SessionProvider', () => ({
  useSession: () => ({ login: mockLogin }),
}));

import api from '../../../../lib/api';

describe('LoginPage', () => {
  const fillForm = async (email, password) => {
    await userEvent.type(screen.getByPlaceholderText('name@email.com'), email);
    await userEvent.type(screen.getByPlaceholderText('••••••••'), password);
  };

  it('renders the sign in form', () => {
    render(<LoginPage />);
    expect(
      screen.getByRole('heading', { name: /sign in to your account/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('logs in a recruiter and routes to the employer dashboard', async () => {
    api.authApi.login.mockResolvedValue({
      id_token: 'tok',
      refresh_token: 'rtok',
      user_id: 'u1',
      email: 'rec@example.com',
      role: 'recruiter',
      recruiter_id: 'r99',
    });

    render(<LoginPage />);
    await fillForm('rec@example.com', 'secret123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.authApi.login).toHaveBeenCalledWith({
        email: 'rec@example.com',
        password: 'secret123',
        remember: false,
      });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      token: 'tok',
      refreshToken: 'rtok',
      user: {
        id: 'u1',
        email: 'rec@example.com',
        role: 'recruiter',
        recruiter_id: 'r99',
      },
      remember: false,
    });
    expect(global.__router.push).toHaveBeenCalledWith('/employer/dashboard');
  });

  it('logs in a candidate and routes to the candidate dashboard', async () => {
    api.authApi.login.mockResolvedValue({
      id_token: 'tok2',
      refresh_token: 'rtok2',
      user_id: 'u2',
      role: 'candidate',
      recruiter_id: null,
    });

    render(<LoginPage />);
    await fillForm('cand@example.com', 'secret123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(global.__router.push).toHaveBeenCalledWith('/candidate/dashboard');
    });

    // falls back to typed email when response.email is missing
    expect(mockLogin).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ email: 'cand@example.com', role: 'candidate' }),
        remember: false,
      })
    );
  });

  it('passes the remember flag when "keep me signed in" is checked', async () => {
    api.authApi.login.mockResolvedValue({ role: 'candidate' });

    render(<LoginPage />);
    await fillForm('cand@example.com', 'secret123');
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.authApi.login).toHaveBeenCalledWith(
        expect.objectContaining({ remember: true })
      );
    });
    expect(mockLogin).toHaveBeenCalledWith(
      expect.objectContaining({ remember: true })
    );
  });

  it('shows the server error message on failed login', async () => {
    api.authApi.login.mockRejectedValue({
      response: { data: { detail: 'Invalid credentials' } },
    });

    render(<LoginPage />);
    await fillForm('cand@example.com', 'wrongpass');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
    expect(global.__router.push).not.toHaveBeenCalled();
  });

  it('shows a generic error when no detail is provided', async () => {
    api.authApi.login.mockRejectedValue(new Error('network'));

    render(<LoginPage />);
    await fillForm('cand@example.com', 'wrongpass');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      await screen.findByText('Login failed. Please try again.')
    ).toBeInTheDocument();
  });

  it('navigates to signup from the footer link', async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText('Create an account'));
    expect(global.__router.push).toHaveBeenCalledWith('/auth/signup');
  });
});
