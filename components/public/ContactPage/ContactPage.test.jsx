import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders the hero heading', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeInTheDocument();
  });

  it('renders the contact info items', () => {
    render(<ContactPage />);
    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  it('renders the message form fields', () => {
    render(<ContactPage />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('shows the success state after submitting the form', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);
    expect(screen.queryByText('Message Sent!')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(screen.getByText('Message Sent!')).toBeInTheDocument();
    expect(screen.getByText(/back to you within 24 hours/i)).toBeInTheDocument();
    // form is replaced by the success box
    expect(screen.queryByRole('button', { name: /Send Message/i })).not.toBeInTheDocument();
  });
});
