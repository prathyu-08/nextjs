import { render, screen } from '@testing-library/react';
import EditProfilePage from './EditProfilePage';

const mockUseSession = jest.fn();
jest.mock('../../../lib/session/SessionProvider', () => ({
  useSession: () => mockUseSession(),
}));

beforeEach(() => {
  mockUseSession.mockReturnValue({
    user: { email: 'a@b.com', role: 'user' },
    isAuthenticated: true,
    loading: false,
    login: jest.fn(),
    logout: jest.fn().mockResolvedValue(),
  });
});

describe('EditProfilePage', () => {
  it('renders the profile header and main section headings', () => {
    render(<EditProfilePage />);
    expect(screen.getAllByRole('heading', { name: 'Job Seeker' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Professional Snapshot' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Skills & Tools' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience & Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Social & Contact Links' })).toBeInTheDocument();
  });

  it('prefills the email field from the session user', () => {
    render(<EditProfilePage />);
    expect(screen.getByDisplayValue('a@b.com')).toBeInTheDocument();
  });

  it('falls back to a default email when the session has no user', () => {
    mockUseSession.mockReturnValue({ user: null });
    render(<EditProfilePage />);
    expect(screen.getByDisplayValue('you@company.com')).toBeInTheDocument();
  });

  it('renders personal information fields with default values', () => {
    render(<EditProfilePage />);
    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jordan Blake')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('Lead Product Designer').length).toBeGreaterThan(0);
    expect(screen.getByDisplayValue('Seattle, USA')).toBeInTheDocument();
  });

  it('renders the skills chips', () => {
    render(<EditProfilePage />);
    ['Product Strategy', 'Design Systems', 'Figma', 'React', 'UX Research'].forEach((s) => {
      expect(screen.getByText(s)).toBeInTheDocument();
    });
  });

  it('renders the action buttons', () => {
    render(<EditProfilePage />);
    expect(screen.getByRole('button', { name: /Update Photo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add skill/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });
});
