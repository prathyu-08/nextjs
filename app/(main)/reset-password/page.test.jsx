import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPasswordPage from './page';
import api from '../../../lib/api';

// Holds the query params returned by useSearchParams() per test.
let mockSearchParams = new URLSearchParams();

// Re-mock next/navigation so useSearchParams() returns values, while keeping
// the shared router spy (global.__router) so navigation assertions still work.
jest.mock('next/navigation', () => ({
  useRouter: () => global.__router,
  usePathname: () => '/',
  useSearchParams: () => mockSearchParams,
  useParams: () => ({}),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock('../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      confirmResetPassword: jest.fn(),
    },
  },
}));

// A password that satisfies every rule in the page.
const VALID_PASSWORD = 'Abcdef1!';

async function fillValidForm(user, { email = true } = {}) {
  if (email) {
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
  }
  // code may already be populated from query/session; type anyway when empty
  const codeInput = screen.getByLabelText(/reset code/i);
  if (!codeInput.value) await user.type(codeInput, 'CODE123');
  await user.type(screen.getByLabelText(/^new password$/i), VALID_PASSWORD);
  await user.type(screen.getByLabelText(/confirm new password/i), VALID_PASSWORD);
}

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    window.sessionStorage.clear();
    jest.useRealTimers();
  });

  it('renders the heading and form fields', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByRole('heading', { name: /set a new password/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/reset code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument();
  });

  it('prefills email and code from query params', async () => {
    mockSearchParams = new URLSearchParams({ email: 'query@example.com', code: 'QCODE99' });
    render(<ResetPasswordPage />);
    await waitFor(() =>
      expect(screen.getByLabelText(/email address/i)).toHaveValue('query@example.com')
    );
    expect(screen.getByLabelText(/reset code/i)).toHaveValue('QCODE99');
  });

  it('falls back to sessionStorage email when no query email present', async () => {
    window.sessionStorage.setItem('resetPasswordEmail', 'stored@example.com');
    render(<ResetPasswordPage />);
    await waitFor(() =>
      expect(screen.getByLabelText(/email address/i)).toHaveValue('stored@example.com')
    );
  });

  it('reads the token query param as the reset code', async () => {
    mockSearchParams = new URLSearchParams({ token: 'TOKEN42' });
    render(<ResetPasswordPage />);
    await waitFor(() => expect(screen.getByLabelText(/reset code/i)).toHaveValue('TOKEN42'));
  });

  it('submits successfully and redirects to login', async () => {
    jest.useFakeTimers({ advanceTimers: true });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    mockSearchParams = new URLSearchParams({ email: 'jane@example.com', code: 'CODE123' });
    api.authApi.confirmResetPassword.mockResolvedValue({ message: 'All set!' });
    window.sessionStorage.setItem('resetPasswordEmail', 'jane@example.com');

    render(<ResetPasswordPage />);
    await waitFor(() => expect(screen.getByLabelText(/reset code/i)).toHaveValue('CODE123'));

    await user.type(screen.getByLabelText(/^new password$/i), VALID_PASSWORD);
    await user.type(screen.getByLabelText(/confirm new password/i), VALID_PASSWORD);
    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('All set!')).toBeInTheDocument();
    expect(api.authApi.confirmResetPassword).toHaveBeenCalledWith({
      email: 'jane@example.com',
      confirmation_code: 'CODE123',
      new_password: VALID_PASSWORD,
    });
    expect(window.sessionStorage.getItem('resetPasswordEmail')).toBeNull();

    jest.advanceTimersByTime(1300);
    expect(global.__router.push).toHaveBeenCalledWith('/auth/login');
  });

  it('shows the server error detail when reset fails', async () => {
    const user = userEvent.setup();
    mockSearchParams = new URLSearchParams({ email: 'jane@example.com', code: 'CODE123' });
    api.authApi.confirmResetPassword.mockRejectedValue({
      response: { data: { detail: 'Invalid code.' } },
    });

    render(<ResetPasswordPage />);
    await waitFor(() => expect(screen.getByLabelText(/reset code/i)).toHaveValue('CODE123'));

    await user.type(screen.getByLabelText(/^new password$/i), VALID_PASSWORD);
    await user.type(screen.getByLabelText(/confirm new password/i), VALID_PASSWORD);
    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('Invalid code.')).toBeInTheDocument();
  });

  it('blocks submission and warns when passwords do not match', async () => {
    const user = userEvent.setup();
    mockSearchParams = new URLSearchParams({ email: 'jane@example.com', code: 'CODE123' });

    render(<ResetPasswordPage />);
    await waitFor(() => expect(screen.getByLabelText(/reset code/i)).toHaveValue('CODE123'));

    await user.type(screen.getByLabelText(/^new password$/i), VALID_PASSWORD);
    await user.type(screen.getByLabelText(/confirm new password/i), 'Different1!');
    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(api.authApi.confirmResetPassword).not.toHaveBeenCalled();
  });
});
