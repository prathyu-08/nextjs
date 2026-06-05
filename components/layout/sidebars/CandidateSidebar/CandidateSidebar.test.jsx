import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Override the global next/navigation mock so usePathname returns an active route.
jest.mock('next/navigation', () => ({
  usePathname: () => '/candidate/dashboard',
}));

import CandidateSidebar from './CandidateSidebar';

describe('CandidateSidebar', () => {
  it('renders the header details', () => {
    render(<CandidateSidebar />);
    expect(screen.getByText('Job Seeker')).toBeInTheDocument();
    expect(screen.getByText('jobseeker@jobsportal.com')).toBeInTheDocument();
    expect(screen.getByText('Open to Work')).toBeInTheDocument();
  });

  it('renders nav links with correct hrefs', () => {
    render(<CandidateSidebar />);
    expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute('href', '/candidate/dashboard');
    expect(screen.getByRole('link', { name: /Edit Profile/i })).toHaveAttribute('href', '/candidate/edit-profile');
    expect(screen.getByRole('link', { name: /My Job Applications/i })).toHaveAttribute('href', '/candidate/my-applications');
    expect(screen.getByRole('link', { name: /Logout/i })).toHaveAttribute('href', '/');
  });

  it('highlights the active route', () => {
    render(<CandidateSidebar />);
    const active = screen.getByRole('link', { name: /Dashboard/i });
    expect(active.className).toMatch(/is-active/);
    const inactive = screen.getByRole('link', { name: /Edit Profile/i });
    expect(inactive.className).not.toMatch(/is-active/);
  });

  it('toggles the "open to work" switch', async () => {
    const user = userEvent.setup();
    render(<CandidateSidebar />);
    const toggle = screen.getByRole('checkbox', { name: /Toggle open to work/i });
    expect(toggle).toBeChecked();
    await user.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});
