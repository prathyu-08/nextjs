import { render, screen } from '@testing-library/react';
import CompanySettingsPage from './CompanySettingsPage';

describe('CompanySettingsPage', () => {
  it('renders the page title and subtitle', () => {
    render(<CompanySettingsPage />);
    expect(screen.getByRole('heading', { name: 'Company Settings', level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Manage account settings and preferences/i)).toBeInTheDocument();
  });

  it('renders the settings section cards', () => {
    render(<CompanySettingsPage />);
    expect(screen.getByRole('heading', { name: 'Notification Preferences' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Privacy Settings' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Security' })).toBeInTheDocument();
  });

  it('renders notification and privacy options', () => {
    render(<CompanySettingsPage />);
    expect(screen.getByText('New application received')).toBeInTheDocument();
    expect(screen.getByText('Make company profile public')).toBeInTheDocument();
  });

  it('renders all option checkboxes checked by default', () => {
    render(<CompanySettingsPage />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    checkboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it('renders the security and danger-zone actions', () => {
    render(<CompanySettingsPage />);
    expect(screen.getByRole('button', { name: 'Change Password' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enable 2FA' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Danger Zone' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deactivate Account' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete Account' })).toBeInTheDocument();
  });
});
