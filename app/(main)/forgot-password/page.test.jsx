import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPasswordPage from './page';
import api from '../../../lib/api';

jest.mock('../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      forgotPassword: jest.fn(),
    },
  },
}));

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renders the heading and email field', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByRole('heading', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset code/i })).toBeInTheDocument();
  });

  it('shows a validation error when submitting an empty email', async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);
    await user.click(screen.getByRole('button', { name: /send reset code/i }));
    expect(await screen.findByText(/please enter your email address/i)).toBeInTheDocument();
    expect(api.authApi.forgotPassword).not.toHaveBeenCalled();
  });

  it('submits successfully, stores the email, and shows the success message', async () => {
    const user = userEvent.setup();
    api.authApi.forgotPassword.mockResolvedValue({ message: 'Reset code sent!' });

    render(<ForgotPasswordPage />);
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /send reset code/i }));

    expect(await screen.findByText('Reset code sent!')).toBeInTheDocument();
    expect(api.authApi.forgotPassword).toHaveBeenCalledWith('jane@example.com');
    expect(window.sessionStorage.getItem('resetPasswordEmail')).toBe('jane@example.com');
  });

  it('shows the server error detail when the request fails', async () => {
    const user = userEvent.setup();
    api.authApi.forgotPassword.mockRejectedValue({
      response: { data: { detail: 'No account found.' } },
    });

    render(<ForgotPasswordPage />);
    await user.type(screen.getByLabelText(/email address/i), 'missing@example.com');
    await user.click(screen.getByRole('button', { name: /send reset code/i }));

    expect(await screen.findByText('No account found.')).toBeInTheDocument();
    expect(window.sessionStorage.getItem('resetPasswordEmail')).toBeNull();
  });
});
