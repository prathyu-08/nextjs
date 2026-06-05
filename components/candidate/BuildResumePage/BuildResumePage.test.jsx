import { render, screen } from '@testing-library/react';
import BuildResumePage from './BuildResumePage';

// The resume builder is a heavy child with its own deps (framer-motion, lucide,
// context, modals). We only care that BuildResumePage wraps it in the Shell with
// the right header, so mock the child to a sentinel.
jest.mock('../../resume-builder/EditProfileResumeBuilder', () => ({
  __esModule: true,
  default: () => <div data-testid="resume-builder">resume builder</div>,
}));

describe('BuildResumePage', () => {
  it('renders the page heading and subtitle inside the shell', () => {
    render(<BuildResumePage />);
    expect(screen.getByRole('heading', { name: 'Build Resume' })).toBeInTheDocument();
    expect(
      screen.getByText('Create a professional resume that stands out to employers')
    ).toBeInTheDocument();
  });

  it('renders the embedded resume builder', () => {
    render(<BuildResumePage />);
    expect(screen.getByTestId('resume-builder')).toBeInTheDocument();
  });

  it('renders the candidate sidebar', () => {
    render(<BuildResumePage />);
    expect(screen.getByRole('link', { name: /Build Resume/i })).toBeInTheDocument();
  });
});
