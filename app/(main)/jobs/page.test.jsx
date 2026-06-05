import { render, screen } from '@testing-library/react';
import Page, { metadata } from './page';

jest.mock('../../../components/jobs/JobsListPage', () => ({
  __esModule: true,
  default: () => <div data-testid="jobs-list-page">Jobs List Stub</div>,
}));

describe('Jobs Page (wrapper)', () => {
  it('renders the JobsListPage child component', () => {
    render(<Page />);
    expect(screen.getByTestId('jobs-list-page')).toBeInTheDocument();
  });

  it('exports the expected metadata', () => {
    expect(metadata).toEqual({
      title: 'Browse Jobs',
      description:
        'Search thousands of curated job openings across industries, experience levels, and locations.',
    });
  });
});
