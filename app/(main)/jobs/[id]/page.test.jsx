import { render, screen } from '@testing-library/react';
import Page, { generateMetadata } from './page';

jest.mock('../../../../components/jobs/JobDetailPage', () => ({
  __esModule: true,
  default: ({ jobId }) => <div data-testid="job-detail-page">Job Detail Stub {jobId}</div>,
}));

describe('Job Detail Page (wrapper)', () => {
  it('renders JobDetailPage and forwards the id param as jobId', () => {
    render(<Page params={{ id: '42' }} />);
    const detail = screen.getByTestId('job-detail-page');
    expect(detail).toBeInTheDocument();
    expect(detail).toHaveTextContent('42');
  });

  it('generateMetadata builds a title from the id param', async () => {
    const meta = await generateMetadata({ params: { id: '7' } });
    expect(meta).toEqual({
      title: 'Job 7',
      description: 'View job details, requirements, and apply directly to this position.',
    });
  });
});
