import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockGetJobs = jest.fn();
jest.mock('../../../lib/api', () => ({
  jobApi: {
    getJobs: (...args) => mockGetJobs(...args),
  },
}));

import JobsListPage from './JobsListPage';

const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Senior Designer',
    employment_type: 'Full Time',
    company_name: 'Acme Co',
    location: 'Fairbanks',
    salary_min: 4000,
    salary_max: 6000,
    description: 'Design things',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    employment_type: 'Contract',
    company_name: 'Globex',
    location: 'Bessemer',
    salary: '$5k',
    summary: 'Build APIs',
    featured: true,
  },
];

describe('JobsListPage', () => {
  it('shows a loading state initially', () => {
    mockGetJobs.mockReturnValue(new Promise(() => {})); // never resolves
    render(<JobsListPage />);
    expect(screen.getByText(/Loading jobs/i)).toBeInTheDocument();
  });

  it('fetches jobs from the API and renders them', async () => {
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);

    expect(await screen.findByText('Senior Designer')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(mockGetJobs).toHaveBeenCalledTimes(1);
    // formatted salary range
    expect(screen.getByText(/\$4,000 - \$6,000/)).toBeInTheDocument();
  });

  it('renders the hero, search panel, filters, sort and pagination', async () => {
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);
    await screen.findByText('Senior Designer');

    expect(screen.getByRole('heading', { name: /Find a role that matches your ambition/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Job title, keyword or company')).toBeInTheDocument();
    // filter group titles
    expect(screen.getByText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Salary Range')).toBeInTheDocument();
    // sort options
    expect(screen.getByText('Salary (High to Low)')).toBeInTheDocument();
    // pagination
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    // results count
    expect(screen.getByRole('heading', { name: /2 Jobs Found/i })).toBeInTheDocument();
  });

  it('lets the user type into the search input', async () => {
    const user = userEvent.setup();
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);
    await screen.findByText('Senior Designer');

    const input = screen.getByPlaceholderText('Job title, keyword or company');
    await user.type(input, 'designer');
    expect(input).toHaveValue('designer');
  });

  it('lets the user toggle a filter checkbox', async () => {
    const user = userEvent.setup();
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);
    await screen.findByText('Senior Designer');

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('navigates to the job detail when a job title is clicked', async () => {
    const user = userEvent.setup();
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);
    await screen.findByText('Senior Designer');

    await user.click(screen.getByText('Senior Designer'));
    expect(global.__router.push).toHaveBeenCalledWith('/jobs/1');
  });

  it('navigates to the job detail via the "View Details" button', async () => {
    const user = userEvent.setup();
    mockGetJobs.mockResolvedValue(SAMPLE_JOBS);
    render(<JobsListPage />);
    await screen.findByText('Backend Engineer');

    const viewButtons = screen.getAllByRole('button', { name: /View Details/i });
    await user.click(viewButtons[1]);
    expect(global.__router.push).toHaveBeenCalledWith('/jobs/2');
  });

  it('shows an empty state when no jobs are returned', async () => {
    const user = userEvent.setup();
    mockGetJobs.mockResolvedValue([]);
    render(<JobsListPage />);

    expect(await screen.findByText('No jobs found')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/auth/signup');
  });

  it('shows an error state when the API call rejects', async () => {
    mockGetJobs.mockRejectedValue(new Error('boom'));
    render(<JobsListPage />);
    await waitFor(() => expect(screen.getByText(/Failed to load jobs/i)).toBeInTheDocument());
  });
});
