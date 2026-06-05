import { render, screen } from '@testing-library/react';
import PublicProfilePage from './PublicProfilePage';

describe('PublicProfilePage', () => {
  it('renders the profile header with name and role', () => {
    render(<PublicProfilePage />);
    expect(screen.getAllByRole('heading', { name: 'Job Seeker' }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('Senior UI/UX Designer').length).toBeGreaterThan(0);
  });

  it('renders the status chips', () => {
    render(<PublicProfilePage />);
    expect(screen.getByText('Open to Work')).toBeInTheDocument();
    expect(screen.getByText('5 Years Exp')).toBeInTheDocument();
    expect(screen.getByText('$6k–$9k Salary')).toBeInTheDocument();
  });

  it('renders the header action buttons', () => {
    render(<PublicProfilePage />);
    expect(screen.getByRole('button', { name: 'Message' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download CV' })).toBeInTheDocument();
  });

  it('renders the main content sections', () => {
    render(<PublicProfilePage />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByText(/multi-disciplinary designer with 5 years/i)).toBeInTheDocument();
  });

  it('renders work experience entries', () => {
    render(<PublicProfilePage />);
    expect(screen.getByRole('heading', { name: 'Senior UI/UX Designer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'UI Designer' })).toBeInTheDocument();
    expect(screen.getByText('Creative Studio')).toBeInTheDocument();
    expect(screen.getByText(/B.Sc. Computer Science — MIT/)).toBeInTheDocument();
  });

  it('renders skills, languages and contact sidebar', () => {
    render(<PublicProfilePage />);
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
    expect(screen.getByText('Native')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByText('seeker@jobsportal.com')).toBeInTheDocument();
  });
});
