import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the brand name and tagline', () => {
    render(<Footer />);
    expect(screen.getByText('NMK GLOBAL')).toBeInTheDocument();
    expect(screen.getByText('incorporated')).toBeInTheDocument();
  });

  it('renders the three column section titles', () => {
    render(<Footer />);
    expect(screen.getByText('For Job Seekers')).toBeInTheDocument();
    expect(screen.getByText('For Employers')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders key footer links with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Browse Jobs' })).toHaveAttribute('href', '/jobs');
    expect(screen.getByRole('link', { name: 'Post a Job' })).toHaveAttribute('href', '/employer/post-job');
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/public/about');
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/public/contact');
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/public/faq');
  });

  it('renders the copyright and legal links', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Cookies')).toBeInTheDocument();
  });
});
