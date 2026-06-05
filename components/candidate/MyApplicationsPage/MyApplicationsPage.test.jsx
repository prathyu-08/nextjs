import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyApplicationsPage from './MyApplicationsPage';

describe('MyApplicationsPage', () => {
  it('renders the page header and stats', () => {
    render(<MyApplicationsPage />);
    expect(screen.getByRole('heading', { name: 'My Applications' })).toBeInTheDocument();
    expect(screen.getByText('Total Applied')).toBeInTheDocument();
    expect(screen.getByText('Interviews')).toBeInTheDocument();
    expect(screen.getAllByText('Accepted').length).toBeGreaterThan(0);
  });

  it('shows all four applications by default', () => {
    render(<MyApplicationsPage />);
    expect(screen.getByRole('heading', { name: 'Senior UI/UX Designer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Full Stack Designer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product Manager' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Front-end Developer' })).toBeInTheDocument();
  });

  it('filters applications when a status tab is clicked', async () => {
    const user = userEvent.setup();
    render(<MyApplicationsPage />);
    // The "Interview" filter tab
    await user.click(screen.getByRole('button', { name: /^Interview/ }));
    expect(screen.getByRole('heading', { name: 'Full Stack Designer' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Senior UI/UX Designer' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Product Manager' })).not.toBeInTheDocument();
  });

  it('shows the rejected application only under the Rejected tab', async () => {
    const user = userEvent.setup();
    render(<MyApplicationsPage />);
    await user.click(screen.getByRole('button', { name: /^Rejected/ }));
    expect(screen.getByRole('heading', { name: 'Product Manager' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Full Stack Designer' })).not.toBeInTheDocument();
  });

  it('navigates to /jobs when View Job is clicked', () => {
    render(<MyApplicationsPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View Job' })[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });
});
