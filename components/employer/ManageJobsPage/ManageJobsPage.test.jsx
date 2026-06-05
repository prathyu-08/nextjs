import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManageJobsPage from './ManageJobsPage';

describe('ManageJobsPage', () => {
  it('renders the page title and subtitle', () => {
    render(<ManageJobsPage />);
    expect(screen.getByRole('heading', { name: 'Manage Jobs', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('View and manage all your job postings')).toBeInTheDocument();
  });

  it('renders the stat summary cards', () => {
    render(<ManageJobsPage />);
    expect(screen.getByText('Total Jobs')).toBeInTheDocument();
    // "Applications" appears both as a stat label and a table header.
    expect(screen.getAllByText('Applications').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('88')).toBeInTheDocument();
  });

  it('renders the jobs table rows', () => {
    render(<ManageJobsPage />);
    expect(screen.getByText('Senior UI/UX Designer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
    expect(screen.getByText('Data Analyst')).toBeInTheDocument();
  });

  it('renders status badges and "new applications" markers', () => {
    render(<ManageJobsPage />);
    expect(screen.getAllByText('active').length).toBeGreaterThan(0);
    expect(screen.getByText('paused')).toBeInTheDocument();
    expect(screen.getByText('expired')).toBeInTheDocument();
    expect(screen.getByText('+3 new')).toBeInTheDocument();
  });

  it('navigates to post-job when the "Post New Job" button is clicked', async () => {
    const user = userEvent.setup();
    render(<ManageJobsPage />);
    await user.click(screen.getByRole('button', { name: /Post New Job/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/post-job');
  });
});
