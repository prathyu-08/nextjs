import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the hero section with headline, search, and CTA links', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /take the next step in your career journey/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter skills or job title/i)).toBeInTheDocument();
    expect(screen.getByText('50k+')).toBeInTheDocument();
    expect(screen.getByText(/post your job/i)).toBeInTheDocument();
    expect(screen.getByText(/search jobs/i)).toBeInTheDocument();
  });

  it('renders the major marketing sections', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /top companies are hiring/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /browse jobs by categories/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /popular industries/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /jobs by cities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /success stories/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /subscribe to our newsletter/i })).toBeInTheDocument();
  });

  it('renders dynamic content from the data arrays', () => {
    render(<HomePage />);
    // company
    expect(screen.getByText('Multimedia Design')).toBeInTheDocument();
    // category
    expect(screen.getByText('Information Technology')).toBeInTheDocument();
    // featured job
    expect(screen.getByText('Full Stack Designer')).toBeInTheDocument();
    // latest job
    expect(screen.getByText('Technical Database Engineer')).toBeInTheDocument();
    // city
    expect(screen.getByText('Atlanta')).toBeInTheDocument();
    // testimonial
    expect(screen.getByText('Samantha Lee')).toBeInTheDocument();
    // blog
    expect(
      screen.getByText(/how to design a candidate experience that actually converts/i)
    ).toBeInTheDocument();
  });

  it('navigates to /jobs when "Search Jobs" hero link is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByText(/search jobs/i));
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });

  it('navigates to /employer/post-job when "Post Your Job" is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByText(/post your job/i));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/post-job');
  });

  it('navigates to /jobs when "View All Featured Jobs" button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: /view all featured jobs/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });

  it('navigates to /employer/list from "View All Featured Companies"', async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    await user.click(screen.getByRole('button', { name: /view all featured companies/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/list');
  });
});
