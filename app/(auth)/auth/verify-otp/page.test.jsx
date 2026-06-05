import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerifyOtpPage from './page';

jest.mock('../../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      confirmSignup: jest.fn(),
      resendConfirmation: jest.fn(),
    },
  },
}));

import api from '../../../../lib/api';

describe('VerifyOtpPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('reads the pending email from sessionStorage', () => {
    window.sessionStorage.setItem('pendingEmail', 'pending@example.com');
    render(<VerifyOtpPage />);
    expect(screen.getByText('pending@example.com')).toBeInTheDocument();
  });

  it('falls back to placeholder text when no pending email is stored', () => {
    render(<VerifyOtpPage />);
    expect(screen.getByText('your email address')).toBeInTheDocument();
  });

  it('restricts the OTP input to 6 numeric digits', async () => {
    render(<VerifyOtpPage />);
    const input = screen.getByPlaceholderText('123456');
    await userEvent.type(input, '12ab3456789');
    expect(input).toHaveValue('123456');
  });

  it('disables submit until 6 digits are entered', async () => {
    render(<VerifyOtpPage />);
    const submit = screen.getByRole('button', { name: /verify email/i });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByPlaceholderText('123456'), '123456');
    expect(submit).toBeEnabled();
  });

  it('confirms signup, shows success state, then routes to login after timeout', async () => {
    jest.useFakeTimers();
    window.sessionStorage.setItem('pendingEmail', 'pending@example.com');
    api.authApi.confirmSignup.mockResolvedValue({});

    render(<VerifyOtpPage />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify email/i }));

    await waitFor(() => {
      expect(api.authApi.confirmSignup).toHaveBeenCalledWith({
        email: 'pending@example.com',
        confirmation_code: '123456',
      });
    });

    expect(
      await screen.findByText(/email verified/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(global.__router.push).toHaveBeenCalledWith('/auth/login');

    jest.useRealTimers();
  });

  it('shows the server error message on verification failure', async () => {
    api.authApi.confirmSignup.mockRejectedValue({
      response: { data: { detail: 'Invalid code' } },
    });

    render(<VerifyOtpPage />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '999999' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify email/i }));

    expect(await screen.findByText('Invalid code')).toBeInTheDocument();
    expect(global.__router.push).not.toHaveBeenCalled();
  });

  it('shows a generic error when no detail is provided', async () => {
    api.authApi.confirmSignup.mockRejectedValue(new Error('boom'));

    render(<VerifyOtpPage />);
    fireEvent.change(screen.getByPlaceholderText('123456'), {
      target: { value: '999999' },
    });
    fireEvent.click(screen.getByRole('button', { name: /verify email/i }));

    expect(
      await screen.findByText('Verification failed. Please try again.')
    ).toBeInTheDocument();
  });

  it('resends the confirmation code', async () => {
    window.sessionStorage.setItem('pendingEmail', 'pending@example.com');
    api.authApi.resendConfirmation.mockResolvedValue({});

    render(<VerifyOtpPage />);
    fireEvent.click(screen.getByRole('button', { name: /resend code/i }));

    await waitFor(() => {
      expect(api.authApi.resendConfirmation).toHaveBeenCalledWith({
        email: 'pending@example.com',
      });
    });
  });

  it('shows an error when resending the code fails', async () => {
    api.authApi.resendConfirmation.mockRejectedValue({
      response: { data: { detail: 'Too many requests' } },
    });

    render(<VerifyOtpPage />);
    fireEvent.click(screen.getByRole('button', { name: /resend code/i }));

    expect(await screen.findByText('Too many requests')).toBeInTheDocument();
  });
});
