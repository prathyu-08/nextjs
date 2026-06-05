import { render, screen } from '@testing-library/react';
import PackagesPage from './PackagesPage';

describe('PackagesPage', () => {
  it('renders the page header', () => {
    render(<PackagesPage />);
    expect(screen.getByRole('heading', { name: 'Packages' })).toBeInTheDocument();
    expect(screen.getByText('Choose the plan that fits your job search')).toBeInTheDocument();
  });

  it('renders the current plan summary', () => {
    render(<PackagesPage />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Basic Jobs View' })).toBeInTheDocument();
    expect(screen.getByText('Your current plan — renews Dec 31, 2025')).toBeInTheDocument();
    expect(screen.getByText('02 / 20')).toBeInTheDocument();
  });

  it('renders all three plans with names and prices', () => {
    render(<PackagesPage />);
    expect(screen.getByRole('heading', { name: 'Free' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Basic' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pro' })).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('29')).toBeInTheDocument();
  });

  it('shows ribbons for popular and current plans', () => {
    render(<PackagesPage />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
    expect(screen.getAllByText('Current Plan').length).toBeGreaterThan(0);
  });

  it('renders plan features and CTA buttons by plan state', () => {
    render(<PackagesPage />);
    expect(screen.getByText('Unlimited applications')).toBeInTheDocument();
    expect(screen.getByText('AI job matching')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select Plan' })).toBeInTheDocument(); // Free
    expect(screen.getByRole('button', { name: 'Upgrade Now' })).toBeInTheDocument(); // Pro (popular)
    expect(screen.getByRole('button', { name: 'Current Plan' })).toBeInTheDocument(); // Basic (current)
  });
});
