import { render, screen } from '@testing-library/react';
import BuildResumePage from './page';

// The page dynamically imports EditProfileResumeBuilder (ssr:false). Mock the
// underlying module so the dynamic import resolves to a simple stub.
jest.mock('../../../../components/resume-builder/EditProfileResumeBuilder', () => ({
  __esModule: true,
  default: () => <div data-testid="resume-builder">Resume Builder Stub</div>,
}));

describe('BuildResumePage (dynamic import wrapper)', () => {
  it('renders the dynamically imported resume builder', async () => {
    render(<BuildResumePage />);
    expect(await screen.findByTestId('resume-builder')).toBeInTheDocument();
  });
});
