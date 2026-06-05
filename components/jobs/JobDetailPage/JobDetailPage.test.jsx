import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockGetJobById = jest.fn();
const mockGetJobs = jest.fn();
jest.mock('../../../lib/api', () => ({
  jobApi: {
    getJobById: (...args) => mockGetJobById(...args),
    getJobs: (...args) => mockGetJobs(...args),
  },
}));

import JobDetailPage from './JobDetailPage';

const JOB = {
  id: 7,
  title: 'Lead Platform Engineer',
  employment_type: 'Full Time',
  company_name: 'Acme Co',
  location: 'New York',
  salary: '$120k',
  description: 'Lead the platform team and own delivery.',
};

const ALL_JOBS = [
  JOB,
  { id: 8, title: 'Junior Dev', employment_type: 'Contract', location: 'Remote', salary: '$60k' },
  { id: 9, title: 'QA Analyst', employment_type: 'Part Time', location: 'Austin', salary: '$50k' },
];

describe('JobDetailPage', () => {
  it('shows a loading state initially', () => {
    mockGetJobById.mockReturnValue(new Promise(() => {}));
    render(<JobDetailPage jobId={7} />);
    expect(screen.getByText(/Loading job details/i)).toBeInTheDocument();
  });

  it('fetches the job by id and renders its details', async () => {
    mockGetJobById.mockResolvedValue(JOB);
    mockGetJobs.mockResolvedValue(ALL_JOBS);
    render(<JobDetailPage jobId={7} />);

    expect(await screen.findByRole('heading', { name: 'Lead Platform Engineer' })).toBeInTheDocument();
    expect(mockGetJobById).toHaveBeenCalledWith(7);
    expect(screen.getByText('Lead the platform team and own delivery.')).toBeInTheDocument();
    // snapshot sections
    expect(screen.getByRole('heading', { name: 'Role Overview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Job Snapshot' })).toBeInTheDocument();
  });

  it('renders related jobs excluding the current one', async () => {
    mockGetJobById.mockResolvedValue(JOB);
    mockGetJobs.mockResolvedValue(ALL_JOBS);
    render(<JobDetailPage jobId={7} />);
    await screen.findByRole('heading', { name: 'Lead Platform Engineer' });

    expect(screen.getByText('Related Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Junior Dev')).toBeInTheDocument();
    expect(screen.getByText('QA Analyst')).toBeInTheDocument();
    // the current job should not appear in the related list (only the hero heading)
    expect(screen.getAllByText('Lead Platform Engineer')).toHaveLength(1);
  });

  it('navigates to a related job when its title is clicked', async () => {
    const user = userEvent.setup();
    mockGetJobById.mockResolvedValue(JOB);
    mockGetJobs.mockResolvedValue(ALL_JOBS);
    render(<JobDetailPage jobId={7} />);
    await screen.findByText('Junior Dev');

    await user.click(screen.getByText('Junior Dev'));
    expect(global.__router.push).toHaveBeenCalledWith('/jobs/8');
  });

  it('renders an error state and a back-to-jobs action on failure', async () => {
    const user = userEvent.setup();
    mockGetJobById.mockRejectedValue(new Error('Not found'));
    render(<JobDetailPage jobId={99} />);

    await waitFor(() => expect(screen.getByText('Not found')).toBeInTheDocument());
    expect(screen.getByRole('heading', { name: /Failed to load job details/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Back to Jobs/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/jobs');
  });
});
