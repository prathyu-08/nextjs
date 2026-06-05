import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotUsernamePage from './page';

// The page imports the api module (the actual call is currently commented out),
// so we mock it to ensure nothing can hit the network.
jest.mock('../../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      forgotUsername: jest.fn(),
    },
  },
}));

describe('ForgotUsernamePage', () => {
  it('renders the recover username form', () => {
    render(<ForgotUsernamePage />);
    expect(
      screen.getByRole('heading', { name: /forgot username\?/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /recover username/i })
    ).toBeInTheDocument();
  });

  it('shows a validation error when the phone field is empty', () => {
    render(<ForgotUsernamePage />);
    fireEvent.click(screen.getByRole('button', { name: /recover username/i }));
    expect(
      screen.getByText('Please enter your phone number.')
    ).toBeInTheDocument();
  });

  it('shows a validation error when the phone field is only whitespace', async () => {
    render(<ForgotUsernamePage />);
    await userEvent.type(screen.getByLabelText(/phone number/i), '   ');
    fireEvent.click(screen.getByRole('button', { name: /recover username/i }));
    expect(
      screen.getByText('Please enter your phone number.')
    ).toBeInTheDocument();
  });

  it('shows the success message and clears the field on valid submit', async () => {
    render(<ForgotUsernamePage />);
    const input = screen.getByLabelText(/phone number/i);
    await userEvent.type(input, '5551234567');
    fireEvent.click(screen.getByRole('button', { name: /recover username/i }));

    expect(
      await screen.findByText(
        'If that phone number is registered, recovery instructions will be sent.'
      )
    ).toBeInTheDocument();
    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('renders the back-to-login link', () => {
    render(<ForgotUsernamePage />);
    const link = screen.getByRole('link', { name: /back to login/i });
    expect(link).toHaveAttribute('href', '/auth/login');
  });
});
