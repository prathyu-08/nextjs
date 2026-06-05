import { render, screen, within, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditProfileResumeBuilder from './EditProfileResumeBuilder';

if (!global.crypto || typeof global.crypto.randomUUID !== 'function') {
  global.crypto = {
    ...(global.crypto || {}),
    randomUUID: () => 'test-uuid-' + Math.random(),
  };
}

afterEach(() => localStorage.clear());

describe('EditProfileResumeBuilder', () => {
  it('renders the page header and section panels', () => {
    render(<EditProfileResumeBuilder />);
    expect(screen.getByRole('heading', { name: 'Build Your Resume' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Attached CV' })).toBeInTheDocument();
    // section panel headings
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('renders seeded resume data inside the section tables', () => {
    render(<EditProfileResumeBuilder />);
    expect(screen.getByText('Product Strategy')).toBeInTheDocument();
    expect(screen.getByText('Lead Product Designer')).toBeInTheDocument();
  });

  it('opens the EntryModal when an Add (+) section button is clicked', async () => {
    render(<EditProfileResumeBuilder />);
    await userEvent.click(screen.getByRole('button', { name: 'Add Skills' }));
    expect(await screen.findByRole('heading', { name: 'Add Skill' })).toBeInTheDocument();
  });

  it('opens the EntryModal in edit mode and can close it via Cancel', async () => {
    render(<EditProfileResumeBuilder />);
    // Skill rows expose an edit <button title="Edit">; the CV section uses an
    // <a> (role link), so target buttons specifically to get a skill's editor.
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    await userEvent.click(editButtons[0]);
    expect(await screen.findByRole('heading', { name: 'Edit Skill' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    // Modal animates out via AnimatePresence — wait for it to unmount.
    await waitForElementToBeRemoved(() => screen.queryByRole('heading', { name: 'Edit Skill' }));
  });

  it('deletes a skill item when its delete button is clicked', async () => {
    render(<EditProfileResumeBuilder />);
    expect(screen.getByText('Design Systems')).toBeInTheDocument();
    // Find the row containing "Design Systems" and click its Delete button.
    const cell = screen.getByText('Design Systems');
    const row = cell.closest('tr');
    const deleteButton = within(row).getByTitle('Delete');
    await userEvent.click(deleteButton);
    expect(screen.queryByText('Design Systems')).not.toBeInTheDocument();
  });

  it('opens the resume preview modal when "Preview current" is clicked', async () => {
    render(<EditProfileResumeBuilder />);
    await userEvent.click(screen.getByRole('button', { name: /Preview current/i }));
    expect(await screen.findByRole('heading', { name: 'Your Resume' })).toBeInTheDocument();
    // "Resume Preview" is an eyebrow <p>, not a heading.
    expect(screen.getByText('Resume Preview')).toBeInTheDocument();
  });

  it('closes the preview modal via the Close button', async () => {
    render(<EditProfileResumeBuilder />);
    await userEvent.click(screen.getByRole('button', { name: /Preview current/i }));
    expect(await screen.findByRole('heading', { name: 'Your Resume' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    // Modal animates out via AnimatePresence — wait for it to unmount.
    await waitForElementToBeRemoved(() => screen.queryByRole('heading', { name: 'Your Resume' }));
  });
});
