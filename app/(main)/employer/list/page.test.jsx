import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployerListPage from './page';

describe('EmployerListPage', () => {
  it('renders the hero heading and intro', () => {
    render(<EmployerListPage />);
    expect(
      screen.getByRole('heading', { name: 'Find companies that align with your values' })
    ).toBeInTheDocument();
    expect(screen.getByText('Explore top employers')).toBeInTheDocument();
  });

  it('renders the search panel input', () => {
    render(<EmployerListPage />);
    expect(
      screen.getByPlaceholderText('Company name or keyword')
    ).toBeInTheDocument();
  });

  it('renders the sidebar filter facets', () => {
    render(<EmployerListPage />);
    expect(screen.getByRole('heading', { name: 'Company size' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Open positions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work model' })).toBeInTheDocument();
    expect(screen.getByText('1-10 employees')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply filters' })).toBeInTheDocument();
  });

  it('renders the results header count', () => {
    render(<EmployerListPage />);
    expect(screen.getByRole('heading', { name: '5 Companies Found' })).toBeInTheDocument();
    expect(screen.getByText('Showing 1 - 5 verified employers')).toBeInTheDocument();
  });

  it('renders all employer cards with details', () => {
    render(<EmployerListPage />);
    // Company names are <a onClick> with no href, so they have no link role.
    expect(screen.getByText('Multimedia Design')).toBeInTheDocument();
    expect(screen.getByText('Power Wave')).toBeInTheDocument();
    expect(screen.getByText('Connect People')).toBeInTheDocument();
    expect(
      screen.getByText('Private · 50-200 employees · New York, USA')
    ).toBeInTheDocument();
    expect(screen.getByText('5 open positions')).toBeInTheDocument();
  });

  it('renders verified badges only for verified employers', () => {
    render(<EmployerListPage />);
    // 3 verified employers in the data set
    expect(screen.getAllByText('Verified')).toHaveLength(3);
  });

  it('navigates to single page when a "View company" button is clicked', async () => {
    const user = userEvent.setup();
    render(<EmployerListPage />);
    const viewButtons = screen.getAllByRole('button', { name: 'View company' });
    await user.click(viewButtons[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/employer/single');
  });

  it('navigates to single page when an employer name link is clicked', async () => {
    const user = userEvent.setup();
    render(<EmployerListPage />);
    await user.click(screen.getByText('Power Wave'));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/single');
  });
});
