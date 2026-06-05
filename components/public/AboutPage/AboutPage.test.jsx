import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders the hero heading and lead', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /Connecting Talent with Opportunity/i })).toBeInTheDocument();
    expect(screen.getByText(/future of job recruitment/i)).toBeInTheDocument();
  });

  it('renders the stats', () => {
    render(<AboutPage />);
    expect(screen.getByText('50K+')).toBeInTheDocument();
    expect(screen.getByText('Active Jobs')).toBeInTheDocument();
    expect(screen.getByText('25K+')).toBeInTheDocument();
    expect(screen.getByText('Placements')).toBeInTheDocument();
  });

  it('renders the mission section', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument();
    expect(screen.getByText('Smart job matching algorithm')).toBeInTheDocument();
  });

  it('renders the team members', () => {
    render(<AboutPage />);
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('CEO & Founder')).toBeInTheDocument();
    expect(screen.getByText('James Wilson')).toBeInTheDocument();
  });

  it('navigates to signup when "Find a Job" is clicked', async () => {
    const user = userEvent.setup();
    render(<AboutPage />);
    await user.click(screen.getByRole('button', { name: 'Find a Job' }));
    expect(global.__router.push).toHaveBeenCalledWith('/auth/signup');
  });

  it('navigates to employer list when "Post a Job" is clicked', async () => {
    const user = userEvent.setup();
    render(<AboutPage />);
    await user.click(screen.getByRole('button', { name: 'Post a Job' }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/list');
  });
});
