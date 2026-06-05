import { render, screen } from '@testing-library/react';
import ResumePreview from './ResumePreview';
import { ResumeBuilderProvider } from '../ResumeBuilderContext';

if (!global.crypto || typeof global.crypto.randomUUID !== 'function') {
  global.crypto = {
    ...(global.crypto || {}),
    randomUUID: () => 'test-uuid-' + Math.random(),
  };
}

const STORAGE_KEY = 'resume-builder-draft';

function renderWithProvider(ui) {
  return render(<ResumeBuilderProvider>{ui}</ResumeBuilderProvider>);
}

afterEach(() => localStorage.clear());

describe('ResumePreview with default (seeded) data', () => {
  it('renders the personal header info', () => {
    renderWithProvider(<ResumePreview />);
    expect(screen.getByRole('heading', { level: 1, name: 'Jordan Blake' })).toBeInTheDocument();
    // appears as both the header title and the seeded experience role
    expect(screen.getAllByText('Lead Product Designer').length).toBeGreaterThan(0);
    expect(screen.getByText('jordan@company.com')).toBeInTheDocument();
    expect(screen.getByText('Seattle, USA')).toBeInTheDocument();
  });

  it('renders the section headings', () => {
    renderWithProvider(<ResumePreview />);
    expect(screen.getByRole('heading', { name: 'Professional Summary' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
  });

  it('renders seeded skills, experience, education and languages', () => {
    renderWithProvider(<ResumePreview />);
    expect(screen.getByText('Product Strategy')).toBeInTheDocument();
    expect(screen.getByText('Skyline Digital')).toBeInTheDocument();
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    // experience "Present" since currentlyWorking is true
    expect(screen.getByText(/Present/)).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('renders the website as a link', () => {
    renderWithProvider(<ResumePreview />);
    const link = screen.getByRole('link', { name: 'https://jordanblake.design' });
    expect(link).toHaveAttribute('href', 'https://jordanblake.design');
  });
});

describe('ResumePreview with empty data (fallbacks)', () => {
  beforeEach(() => {
    const empty = {
      personal: { name: '', title: '', email: '', phone: '', location: '', website: '' },
      summary: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empty));
  });

  it('shows placeholder name and title', () => {
    renderWithProvider(<ResumePreview />);
    expect(screen.getByRole('heading', { level: 1, name: 'Your Name' })).toBeInTheDocument();
    expect(screen.getByText('Professional Title')).toBeInTheDocument();
  });

  it('shows empty-state placeholders for each section', () => {
    renderWithProvider(<ResumePreview />);
    expect(screen.getByText('Add your professional summary')).toBeInTheDocument();
    expect(screen.getByText('No skills added yet')).toBeInTheDocument();
    expect(screen.getByText('No experience added yet')).toBeInTheDocument();
    expect(screen.getByText('No education added yet')).toBeInTheDocument();
    expect(screen.getByText('No projects added yet')).toBeInTheDocument();
    expect(screen.getByText('No certifications')).toBeInTheDocument();
    expect(screen.getByText('No languages')).toBeInTheDocument();
  });
});
