import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployerSinglePage from './page';

describe('EmployerSinglePage', () => {
  it('renders the company profile header', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByRole('heading', { name: 'Skyline Digital' })).toBeInTheDocument();
    expect(screen.getByText('Digital Experience Studio')).toBeInTheDocument();
    expect(screen.getByText('📍 San Francisco, USA')).toBeInTheDocument();
  });

  it('renders the main content section headings', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByRole('heading', { name: 'Who We Are' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What We Value' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Life at Skyline' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Inside Our Studios' })).toBeInTheDocument();
  });

  it('renders company values and perks', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByText('🎨 Design Thinking')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work from Anywhere' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Learning Budget' })).toBeInTheDocument();
  });

  it('renders the company snapshot sidebar', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByRole('heading', { name: 'Company Snapshot' })).toBeInTheDocument();
    expect(screen.getByText('skylinedigital.com')).toBeInTheDocument();
    expect(screen.getByText('45% YoY revenue')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jordan Blake')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders the open roles list', () => {
    render(<EmployerSinglePage />);
    expect(screen.getByRole('heading', { name: 'Open Roles' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product Delivery Lead' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ERP Transformation Manager' })).toBeInTheDocument();
    expect(screen.getByText('Salary: $6,000 - $9,500')).toBeInTheDocument();
  });

  it('navigates to /jobs when an Apply button is clicked', async () => {
    const user = userEvent.setup();
    render(<EmployerSinglePage />);
    const applyButtons = screen.getAllByRole('button', { name: 'Apply' });
    await user.click(applyButtons[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });
});
