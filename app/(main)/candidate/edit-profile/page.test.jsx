import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditProfilePage from './page';

// Mock the API (default export with candidateApi namespace). The jest.fns must
// be created INSIDE the factory — a const declared outside is still in the TDZ
// when the hoisted factory runs at import time. We read them back afterwards.
jest.mock('../../../../lib/api', () => ({
  __esModule: true,
  default: {
    candidateApi: {
      getFullProfile: jest.fn(),
      updateProfile: jest.fn(),
      uploadProfilePicture: jest.fn(),
      updateSkills: jest.fn(),
      addExperience: jest.fn(),
      updateExperience: jest.fn(),
      deleteExperience: jest.fn(),
      addEducation: jest.fn(),
      updateEducation: jest.fn(),
      deleteEducation: jest.fn(),
      addProject: jest.fn(),
      updateProject: jest.fn(),
      deleteProject: jest.fn(),
    },
  },
}));
const mockCandidateApi = jest.requireMock('../../../../lib/api').default.candidateApi;

const baseProfile = {
  full_name: 'Ada Lovelace',
  email: 'ada@example.com',
  phone_number: '+1 555 0100',
  resume_headline: 'Senior Engineer',
  profile_summary: 'Builds things.',
  current_location: 'London, UK',
  preferred_location: 'Remote',
  total_experience: 8,
  current_ctc: 90000,
  expected_ctc: 120000,
  notice_period: '2 weeks',
  willing_to_relocate: true,
  preferred_shift: 'Day',
  employment_type_preference: 'Full-time',
  linkedin_url: 'https://linkedin.com/in/ada',
  github_url: 'https://github.com/ada',
  portfolio_url: 'https://ada.dev',
  public_username: 'ada',
  visibility: 'public',
  profile_picture: null,
  education: [
    { id: 1, institution: 'Cambridge', degree: 'B.Sc.', field_of_study: 'CS', start_year: 2010, end_year: 2014, grade: '3.9' },
  ],
  experience: [
    { id: 11, company_name: 'Analytical Engines', role: 'Lead Engineer', start_date: '2015-01-01', end_date: null, is_current: true, description: 'Led the team.' },
  ],
  skills: [
    { id: 21, name: 'React', proficiency: 'Expert', years_of_experience: 5 },
  ],
  projects: [
    { id: 31, title: 'Difference Engine', description: 'A calculator.', technologies_used: 'Brass', project_url: 'https://example.com/de' },
  ],
};

function mockProfile(overrides = {}) {
  mockCandidateApi.getFullProfile.mockResolvedValue({ ...baseProfile, ...overrides });
}

// Render and wait for the loading spinner to be replaced by the loaded profile.
async function renderLoaded() {
  render(<EditProfilePage />);
  expect(await screen.findByDisplayValue('Ada Lovelace')).toBeInTheDocument();
}

describe('EditProfilePage', () => {
  beforeEach(() => {
    Object.values(mockCandidateApi).forEach((fn) => fn.mockReset());
    mockProfile();
  });

  it('shows a loading state, then renders the loaded header', async () => {
    render(<EditProfilePage />);
    expect(screen.getByText(/Loading your profile/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders the major section headings', async () => {
    await renderLoaded();
    expect(screen.getByRole('heading', { name: 'Personal Information' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Professional Snapshot' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Skills & Tools' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('populates inputs with values from the API', async () => {
    await renderLoaded();
    expect(screen.getByDisplayValue('ada@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('London, UK')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://github.com/ada')).toBeInTheDocument();
  });

  it('renders loaded skill, experience, education and project records', async () => {
    await renderLoaded();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText(/Lead Engineer/)).toBeInTheDocument();
    expect(screen.getByText('Analytical Engines')).toBeInTheDocument();
    expect(screen.getByText(/Cambridge/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Difference Engine' })).toBeInTheDocument();
  });

  it('edits an editable field', async () => {
    const user = userEvent.setup();
    await renderLoaded();
    const headline = screen.getByDisplayValue('Senior Engineer');
    await user.clear(headline);
    await user.type(headline, 'Principal Engineer');
    expect(headline).toHaveValue('Principal Engineer');
  });

  it('saves the profile via the API', async () => {
    const user = userEvent.setup();
    mockCandidateApi.updateProfile.mockResolvedValue({});
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Save all changes/i }));
    await waitFor(() => expect(mockCandidateApi.updateProfile).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Profile saved successfully!')).toBeInTheDocument();
  });

  it('shows an error toast when saving fails', async () => {
    const user = userEvent.setup();
    mockCandidateApi.updateProfile.mockRejectedValue({ response: { data: { detail: 'Nope' } } });
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Save all changes/i }));
    expect(await screen.findByText('Nope')).toBeInTheDocument();
  });

  it('opens the Add Skill modal and validates required name', async () => {
    const user = userEvent.setup();
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add skill/i }));
    expect(screen.getByRole('heading', { name: 'Add Skill' })).toBeInTheDocument();
    // Save with empty name -> validation error
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByText('Skill name is required.')).toBeInTheDocument();
    expect(mockCandidateApi.updateSkills).not.toHaveBeenCalled();
  });

  it('adds a skill through the modal', async () => {
    const user = userEvent.setup();
    mockCandidateApi.updateSkills.mockResolvedValue({
      skills: [
        { skill: { id: 21, name: 'React' }, proficiency: 'Expert', years_of_experience: 5 },
        { skill: { id: 22, name: 'GraphQL' }, proficiency: 'Intermediate', years_of_experience: 2 },
      ],
    });
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add skill/i }));
    await user.type(screen.getByPlaceholderText('e.g. React, Figma, Python'), 'GraphQL');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockCandidateApi.updateSkills).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Skill saved!')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('opens the Add Experience modal and validates required fields', async () => {
    const user = userEvent.setup();
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add experience/i }));
    expect(screen.getByRole('heading', { name: 'Add Experience' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByText('Company and role are required.')).toBeInTheDocument();
  });

  it('adds an experience entry through the modal', async () => {
    const user = userEvent.setup();
    mockCandidateApi.addExperience.mockResolvedValue({ id: 99 });
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add experience/i }));
    await user.type(screen.getByPlaceholderText('e.g. Acme Corp'), 'Newco');
    await user.type(screen.getByPlaceholderText('e.g. Senior Designer'), 'Designer');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockCandidateApi.addExperience).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Experience added!')).toBeInTheDocument();
  });

  it('deletes an experience entry after confirmation', async () => {
    const user = userEvent.setup();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    mockCandidateApi.deleteExperience.mockResolvedValue();
    await renderLoaded();
    // The experience card edit/delete buttons are icon-only; grab the delete (trash) button.
    const expSection = screen.getByRole('heading', { name: 'Work Experience' }).closest('section');
    const buttons = within(expSection).getAllByRole('button');
    // last button in the card row is the delete button
    await user.click(buttons[buttons.length - 1]);
    await waitFor(() => expect(mockCandidateApi.deleteExperience).toHaveBeenCalledWith(11));
    confirmSpy.mockRestore();
  });

  it('opens the Add Education modal and adds an entry', async () => {
    const user = userEvent.setup();
    mockCandidateApi.addEducation.mockResolvedValue({ id: 77 });
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add education/i }));
    expect(screen.getByRole('heading', { name: 'Add Education' })).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('e.g. Stanford University'), 'MIT');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockCandidateApi.addEducation).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Education added!')).toBeInTheDocument();
  });

  it('opens the Add Project modal and adds an entry', async () => {
    const user = userEvent.setup();
    mockCandidateApi.addProject.mockResolvedValue({ id: 88 });
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add project/i }));
    expect(screen.getByRole('heading', { name: 'Add Project' })).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText('e.g. Resume Builder App'), 'My App');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockCandidateApi.addProject).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Project added!')).toBeInTheDocument();
  });

  it('closes a modal via Cancel without calling the API', async () => {
    const user = userEvent.setup();
    await renderLoaded();
    await user.click(screen.getByRole('button', { name: /Add skill/i }));
    expect(screen.getByRole('heading', { name: 'Add Skill' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Add Skill' })).not.toBeInTheDocument()
    );
    expect(mockCandidateApi.updateSkills).not.toHaveBeenCalled();
  });

  it('shows an error toast when the initial profile load fails', async () => {
    mockCandidateApi.getFullProfile.mockRejectedValueOnce(new Error('boom'));
    render(<EditProfilePage />);
    expect(
      await screen.findByText('Failed to load profile. Please refresh.')
    ).toBeInTheDocument();
  });
});
