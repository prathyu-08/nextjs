import { render, screen } from '@testing-library/react';
import JobAlertPage from './JobAlertPage';

describe('JobAlertPage', () => {
  it('renders the page header', () => {
    render(<JobAlertPage />);
    expect(screen.getByRole('heading', { name: 'Job Alerts' })).toBeInTheDocument();
    expect(
      screen.getByText('Get notified when new matching jobs are posted')
    ).toBeInTheDocument();
  });

  it('renders the create-new-alert form with its fields', () => {
    render(<JobAlertPage />);
    expect(screen.getByRole('heading', { name: 'Create New Alert' })).toBeInTheDocument();
    expect(screen.getByText('Alert Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Senior Designer Jobs')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. UI Designer, Figma, React')).toBeInTheDocument();
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Salary Range')).toBeInTheDocument();
    expect(screen.getByText('Alert Frequency')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Alert' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('shows the count of existing alerts', () => {
    render(<JobAlertPage />);
    expect(screen.getByRole('heading', { name: 'Your Alerts (3)' })).toBeInTheDocument();
  });

  it('lists each existing alert with its title and meta', () => {
    render(<JobAlertPage />);
    expect(screen.getByRole('heading', { name: 'UI/UX Designer Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React Developer Roles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product Manager Positions' })).toBeInTheDocument();
    expect(screen.getByText('UI Designer, UX Designer')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('shows Active and Paused status badges based on alert state', () => {
    render(<JobAlertPage />);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });
});
