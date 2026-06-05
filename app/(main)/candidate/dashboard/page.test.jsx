import { render, screen } from '@testing-library/react';
import CandidateDashboardPage from './page';

describe('CandidateDashboardPage', () => {
  it('renders the stat labels and values', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getByText('Profile Views')).toBeInTheDocument();
    expect(screen.getByText('219')).toBeInTheDocument();
    expect(screen.getByText('Followings')).toBeInTheDocument();
    expect(screen.getByText('My CV List')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('renders the candidate cover card identity', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getAllByRole('heading', { name: 'Job Seeker' }).length).toBeGreaterThan(0);
    expect(
      screen.getByText('Bainbridge Island, Washington, United States of America')
    ).toBeInTheDocument();
    expect(screen.getByText('seeker@jobsportal.com')).toBeInTheDocument();
  });

  it('renders the major panel section headings', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getByRole('heading', { name: 'My Applied Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Active Package Details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recommended Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'My Followings' })).toBeInTheDocument();
  });

  it('renders applied job cards with details', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Project Manager' })).toBeInTheDocument();
    expect(screen.getByText('Salary: USD5000 - USD6000/Monthly')).toBeInTheDocument();
    expect(screen.getByText('Applied: Oct 31, 2025')).toBeInTheDocument();
  });

  it('renders active package detail values', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getByText('Package Name')).toBeInTheDocument();
    expect(screen.getByText('Basic Jobs View')).toBeInTheDocument();
    expect(screen.getByText('02 / 20')).toBeInTheDocument();
  });

  it('renders followed companies with open-job counts', () => {
    render(<CandidateDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Web Design Studio' })).toBeInTheDocument();
    expect(screen.getByText('8 Open Jobs')).toBeInTheDocument();
  });
});
