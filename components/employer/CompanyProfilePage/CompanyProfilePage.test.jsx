import { render, screen } from '@testing-library/react';
import CompanyProfilePage from './CompanyProfilePage';

describe('CompanyProfilePage', () => {
  it('renders the page title and subtitle', () => {
    render(<CompanyProfilePage />);
    expect(screen.getByRole('heading', { name: 'Company Profile', level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Update your company information/i)).toBeInTheDocument();
  });

  it('renders the logo card with upload/remove actions', () => {
    render(<CompanyProfilePage />);
    expect(screen.getByRole('heading', { name: 'Company Logo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload Logo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('renders the basic info and contact section cards', () => {
    render(<CompanyProfilePage />);
    expect(screen.getByRole('heading', { name: 'Basic Info' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact & Location' })).toBeInTheDocument();
  });

  it('renders prefilled field values', () => {
    render(<CompanyProfilePage />);
    expect(screen.getByDisplayValue('NMK Global Inc.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Information Technology')).toBeInTheDocument();
    expect(screen.getByDisplayValue('info@nmkglobalinc.com')).toBeInTheDocument();
  });

  it('renders the save and cancel actions', () => {
    render(<CompanyProfilePage />);
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
