import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostJobPage from './page';

const mockCreateJob = jest.fn();
jest.mock('../../../../lib/api', () => ({
  jobApi: {
    createJob: (...args) => mockCreateJob(...args),
  },
}));

describe('PostJobPage', () => {
  beforeEach(() => {
    mockCreateJob.mockReset();
  });

  it('renders the hero and section headings', () => {
    render(<PostJobPage />);
    expect(screen.getByRole('heading', { name: 'Create a new opportunity' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Job overview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Role basics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Candidate preferences' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Role description' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Publishing' })).toBeInTheDocument();
  });

  it('renders form fields with their default values', () => {
    render(<PostJobPage />);
    expect(screen.getByPlaceholderText('e.g. Senior Product Designer')).toHaveValue('');
    // employment_type select defaults to "Full Time"
    expect(screen.getByDisplayValue('Full Time')).toBeInTheDocument();
    // experience select defaults to "1+ years"
    expect(screen.getByDisplayValue('1+ years')).toBeInTheDocument();
  });

  it('updates text inputs on change', async () => {
    const user = userEvent.setup();
    render(<PostJobPage />);
    const titleInput = screen.getByPlaceholderText('e.g. Senior Product Designer');
    await user.type(titleInput, 'Backend Engineer');
    expect(titleInput).toHaveValue('Backend Engineer');
  });

  it('toggles the featured checkbox', async () => {
    const user = userEvent.setup();
    render(<PostJobPage />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('navigates back to dashboard from the hero button', async () => {
    const user = userEvent.setup();
    render(<PostJobPage />);
    await user.click(screen.getByRole('button', { name: /Back to Dashboard/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/dashboard');
  });

  it('navigates to manage-jobs when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<PostJobPage />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(global.__router.push).toHaveBeenCalledWith('/employer/manage-jobs');
  });

  it('submits the form, calls the API, and shows a success message', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    mockCreateJob.mockResolvedValue({ title: 'Backend Engineer' });
    render(<PostJobPage />);

    await user.type(
      screen.getByPlaceholderText('e.g. Senior Product Designer'),
      'Backend Engineer'
    );
    await user.type(screen.getByPlaceholderText('Hybrid · Seattle, USA'), 'Remote');
    await user.type(
      screen.getByPlaceholderText('e.g. React, TypeScript, UX'),
      'React, Node'
    );
    await user.click(screen.getByRole('button', { name: 'Publish Job' }));

    await waitFor(() => {
      expect(screen.getByText('Job created: Backend Engineer')).toBeInTheDocument();
    });

    expect(mockCreateJob).toHaveBeenCalledTimes(1);
    const payload = mockCreateJob.mock.calls[0][0];
    expect(payload.title).toBe('Backend Engineer');
    expect(payload.location).toBe('Remote');
    expect(payload.skills).toEqual(['React', 'Node']);
    expect(payload.employment_type).toBe('Full Time');

    // success path schedules a navigation after 1s
    jest.advanceTimersByTime(1000);
    expect(global.__router.push).toHaveBeenCalledWith('/employer/manage-jobs');
    jest.useRealTimers();
  });

  it('shows an error message when the API rejects', async () => {
    const user = userEvent.setup();
    mockCreateJob.mockRejectedValue({
      response: { data: { detail: 'Server exploded' } },
    });
    render(<PostJobPage />);

    await user.type(
      screen.getByPlaceholderText('e.g. Senior Product Designer'),
      'QA Engineer'
    );
    await user.click(screen.getByRole('button', { name: 'Publish Job' }));

    expect(await screen.findByText('Server exploded')).toBeInTheDocument();
    expect(global.__router.push).not.toHaveBeenCalled();
  });
});
