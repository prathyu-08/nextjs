import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployerDashboardPage from './page';

describe('EmployerDashboardPage', () => {
  it('renders the welcome header', () => {
    render(<EmployerDashboardPage />);
    expect(
      screen.getByRole('heading', { name: 'Welcome back, Gopikiran!' })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Here's what's happening with your job postings today.")
    ).toBeInTheDocument();
  });

  it('renders the stat cards with labels and values', () => {
    render(<EmployerDashboardPage />);
    expect(screen.getByText('Active Jobs')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Total Applicants')).toBeInTheDocument();
    expect(screen.getByText('142')).toBeInTheDocument();
    expect(screen.getByText('2341')).toBeInTheDocument();
    expect(screen.getByText('Followers')).toBeInTheDocument();
  });

  it('renders recent applications and section headings', () => {
    render(<EmployerDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Recent Applications' })).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson', { selector: 'div' })).toBeInTheDocument();
    expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();
  });

  it('renders the active jobs table headers and rows', () => {
    render(<EmployerDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Your Active Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Job Title' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Applications' })).toBeInTheDocument();
    expect(screen.getByText('Senior UI/UX Designer')).toBeInTheDocument();
    expect(screen.getAllByText('Full Stack Developer').length).toBeGreaterThan(0);
  });

  it('renders package, messages, quick actions and activity sections', () => {
    render(<EmployerDashboardPage />);
    expect(screen.getByRole('heading', { name: 'Your Package' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Premium Pack' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent Messages' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent Activity' })).toBeInTheDocument();
  });

  it('navigates to post-job when "Post New Job" is clicked', async () => {
    const user = userEvent.setup();
    render(<EmployerDashboardPage />);
    await user.click(screen.getByRole('button', { name: /Post New Job/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/post-job');
  });

  it('navigates via the Manage Jobs link', async () => {
    const user = userEvent.setup();
    render(<EmployerDashboardPage />);
    // "Manage Jobs" shows up as a sidebar Link and as a quick action that calls
    // router.push; the quick action is the last one in DOM order.
    const items = screen.getAllByText('Manage Jobs');
    await user.click(items[items.length - 1]);
    expect(global.__router.push).toHaveBeenCalledWith('/employer/manage-jobs');
  });

  it('navigates via quick action items', async () => {
    const user = userEvent.setup();
    render(<EmployerDashboardPage />);
    const items = screen.getAllByText('Company Profile');
    await user.click(items[items.length - 1]);
    expect(global.__router.push).toHaveBeenCalledWith('/employer/company-profile');
  });
});
