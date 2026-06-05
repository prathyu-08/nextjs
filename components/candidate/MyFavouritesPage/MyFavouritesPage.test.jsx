import { render, screen, fireEvent } from '@testing-library/react';
import MyFavouritesPage from './MyFavouritesPage';

describe('MyFavouritesPage', () => {
  it('renders the header with saved jobs count subtitle', () => {
    render(<MyFavouritesPage />);
    expect(screen.getByRole('heading', { name: 'My Favourite Jobs' })).toBeInTheDocument();
    expect(screen.getByText('4 saved jobs')).toBeInTheDocument();
  });

  it('renders all saved job cards with titles, companies and descriptions', () => {
    render(<MyFavouritesPage />);
    expect(screen.getByRole('heading', { name: 'UI UX Designer Required' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Full Stack Designer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketing Specialist' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Web Developer' })).toBeInTheDocument();
    expect(screen.getByText(/multi-disciplinary designer to ship intuitive/i)).toBeInTheDocument();
  });

  it('renders job type badges', () => {
    render(<MyFavouritesPage />);
    expect(screen.getAllByText('Full Time')).toHaveLength(2);
    expect(screen.getByText('Part Time')).toBeInTheDocument();
    expect(screen.getByText('Contract')).toBeInTheDocument();
  });

  it('renders Details and Apply Now actions per card', () => {
    render(<MyFavouritesPage />);
    expect(screen.getAllByRole('button', { name: 'Details' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Apply Now' })).toHaveLength(4);
  });

  it('navigates to /jobs when Details is clicked', () => {
    render(<MyFavouritesPage />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Details' })[0]);
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });
});
