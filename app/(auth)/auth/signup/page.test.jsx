import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupPage from './page';

jest.mock('../../../../lib/api', () => ({
  __esModule: true,
  default: {
    authApi: {
      signup: jest.fn(),
    },
  },
}));

import api from '../../../../lib/api';

describe('SignupPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  const fillCandidate = async () => {
    await userEvent.type(screen.getByPlaceholderText('Samantha'), 'Sam');
    await userEvent.type(screen.getByPlaceholderText('Jenkins'), 'Jenkins');
    await userEvent.type(screen.getByPlaceholderText('name@email.com'), 'sam@example.com');
    await userEvent.type(screen.getByPlaceholderText('Strong password'), 'password1');
    await userEvent.type(screen.getByPlaceholderText('Repeat password'), 'password1');
    // agree to terms
    fireEvent.click(screen.getByRole('checkbox'));
  };

  it('renders the candidate form by default', () => {
    render(<SignupPage />);
    expect(
      screen.getByRole('heading', { name: /create your free account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create candidate account/i })
    ).toBeInTheDocument();
  });

  it('submits the candidate payload, stores pendingEmail and routes to login', async () => {
    api.authApi.signup.mockResolvedValue({});

    render(<SignupPage />);
    await fillCandidate();
    fireEvent.click(screen.getByRole('button', { name: /create candidate account/i }));

    await waitFor(() => {
      expect(api.authApi.signup).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'candidate',
          email: 'sam@example.com',
          password: 'password1',
          confirm_password: 'password1',
          first_name: 'Sam',
          last_name: 'Jenkins',
          agree_to_terms: true,
        })
      );
    });

    expect(window.sessionStorage.getItem('pendingEmail')).toBe('sam@example.com');
    expect(global.__router.push).toHaveBeenCalledWith('/auth/login');
  });

  it('switches to the employer form and submits work_email payload', async () => {
    api.authApi.signup.mockResolvedValue({});

    render(<SignupPage />);
    fireEvent.click(screen.getByRole('button', { name: /^employer$/i }));

    expect(
      screen.getByRole('button', { name: /create employer account/i })
    ).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Acme Studios'), 'Acme Inc');
    await userEvent.type(screen.getByPlaceholderText('you@company.com'), 'hr@acme.com');
    await userEvent.type(screen.getByPlaceholderText('https://yourcompany.com'), 'https://acme.com');
    await userEvent.type(screen.getByPlaceholderText('Recruiter / HR Manager'), 'Recruiter');
    // The employer password fields have no placeholder; select them by name.
    const pwInputs = document.querySelectorAll('input[name="password"], input[name="confirm_password"]');
    await userEvent.type(pwInputs[0], 'password1');
    await userEvent.type(pwInputs[1], 'password1');

    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /create employer account/i }));

    await waitFor(() => {
      expect(api.authApi.signup).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'employer',
          work_email: 'hr@acme.com',
          company_name: 'Acme Inc',
          website: 'https://acme.com',
          agree_to_terms: true,
        })
      );
    });
    expect(global.__router.push).toHaveBeenCalledWith('/auth/login');
  });

  it('shows the server error message (string detail) on failure', async () => {
    api.authApi.signup.mockRejectedValue({
      response: { data: { detail: 'Email already registered' } },
    });

    render(<SignupPage />);
    await fillCandidate();
    fireEvent.click(screen.getByRole('button', { name: /create candidate account/i }));

    expect(await screen.findByText('Email already registered')).toBeInTheDocument();
    expect(global.__router.push).not.toHaveBeenCalled();
  });

  it('shows the first validation message when detail is an array', async () => {
    api.authApi.signup.mockRejectedValue({
      response: { data: { detail: [{ msg: 'password too weak' }] } },
    });

    render(<SignupPage />);
    await fillCandidate();
    fireEvent.click(screen.getByRole('button', { name: /create candidate account/i }));

    expect(await screen.findByText('password too weak')).toBeInTheDocument();
  });

  it('shows a generic error when no detail is provided', async () => {
    api.authApi.signup.mockRejectedValue(new Error('boom'));

    render(<SignupPage />);
    await fillCandidate();
    fireEvent.click(screen.getByRole('button', { name: /create candidate account/i }));

    expect(
      await screen.findByText('Registration failed. Please try again.')
    ).toBeInTheDocument();
  });

  it('navigates to login from the footer link', () => {
    render(<SignupPage />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(global.__router.push).toHaveBeenCalledWith('/auth/login');
  });
});
