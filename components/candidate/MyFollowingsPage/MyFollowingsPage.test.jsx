import { render, screen, fireEvent } from '@testing-library/react';
import MyFollowingsPage from './MyFollowingsPage';

describe('MyFollowingsPage', () => {
  it('renders the header with following count subtitle', () => {
    render(<MyFollowingsPage />);
    expect(screen.getByRole('heading', { name: 'My Followings' })).toBeInTheDocument();
    expect(screen.getByText('Following 4 companies')).toBeInTheDocument();
  });

  it('renders all followed companies with industry and description', () => {
    render(<MyFollowingsPage />);
    expect(screen.getByRole('heading', { name: 'Web Design Studio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Multimedia Design' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Connect People' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Power Wave' })).toBeInTheDocument();
    expect(screen.getByText('Information Technology')).toBeInTheDocument();
    expect(screen.getByText(/Award-winning digital design agency/i)).toBeInTheDocument();
  });

  it('renders meta details such as open jobs and employees', () => {
    render(<MyFollowingsPage />);
    expect(screen.getByText('8 open jobs')).toBeInTheDocument();
    expect(screen.getAllByText('50-200 employees').length).toBeGreaterThan(0);
  });

  it('renders Unfollow plus View buttons per company', () => {
    render(<MyFollowingsPage />);
    expect(screen.getAllByRole('button', { name: 'Unfollow' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'View Company' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'View Jobs' })).toHaveLength(4);
  });

  it('navigates to the company page when View Company is clicked', () => {
    render(<MyFollowingsPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View Company' })[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/employer/single');
  });

  it('navigates to /jobs when View Jobs is clicked', () => {
    render(<MyFollowingsPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View Jobs' })[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });
});
