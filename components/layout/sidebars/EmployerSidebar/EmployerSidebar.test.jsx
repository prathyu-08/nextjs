import { render, screen } from '@testing-library/react';

// Override the global next/navigation mock so usePathname returns an active route.
jest.mock('next/navigation', () => ({
  usePathname: () => '/employer/manage-jobs',
}));

import EmployerSidebar from './EmployerSidebar';

describe('EmployerSidebar', () => {
  it('renders the header details', () => {
    render(<EmployerSidebar />);
    expect(screen.getByText('Gopikiran')).toBeInTheDocument();
    expect(screen.getByText('gopi.kiran@nmkglobalinc.com')).toBeInTheDocument();
    expect(screen.getByText('Premium Employer')).toBeInTheDocument();
  });

  it('renders nav links with correct hrefs', () => {
    render(<EmployerSidebar />);
    expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute('href', '/employer/dashboard');
    expect(screen.getByRole('link', { name: /Company Profile/i })).toHaveAttribute('href', '/employer/company-profile');
    expect(screen.getByRole('link', { name: /Post a Job/i })).toHaveAttribute('href', '/employer/post-job');
    expect(screen.getByRole('link', { name: /Manage Jobs/i })).toHaveAttribute('href', '/employer/manage-jobs');
  });

  it('highlights the active route', () => {
    render(<EmployerSidebar />);
    const active = screen.getByRole('link', { name: /Manage Jobs/i });
    expect(active.className).toMatch(/is-active/);
    const inactive = screen.getByRole('link', { name: /Dashboard/i });
    expect(inactive.className).not.toMatch(/is-active/);
  });
});
