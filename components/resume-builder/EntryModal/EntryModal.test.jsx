import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntryModal from './EntryModal';

function setup(props = {}) {
  const onClose = jest.fn();
  const onSave = jest.fn();
  const utils = render(
    <EntryModal
      type="skills"
      editingItem={null}
      open
      onClose={onClose}
      onSave={onSave}
      {...props}
    />
  );
  return { onClose, onSave, ...utils };
}

describe('EntryModal', () => {
  it('renders nothing when open is false', () => {
    render(
      <EntryModal type="skills" editingItem={null} open={false} onClose={() => {}} onSave={() => {}} />
    );
    expect(screen.queryByText('Add Skill')).not.toBeInTheDocument();
  });

  it('renders the add title and fields for the skills type', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Add Skill' })).toBeInTheDocument();
    expect(screen.getByText('Skill Name')).toBeInTheDocument();
    expect(screen.getByText('Skill Level')).toBeInTheDocument();
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders the edit title and "Save Changes" button when editingItem is provided', () => {
    setup({ editingItem: { name: 'React', level: 'Advanced', years: '4' } });
    expect(screen.getByRole('heading', { name: 'Edit Skill' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('shows validation errors and does not call onSave when required fields are empty', async () => {
    const { onSave } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    // "name" is required -> error rendered
    expect(screen.getAllByText('This field is required').length).toBeGreaterThan(0);
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onSave with the form values when required fields are filled', async () => {
    const { onSave } = setup();
    // Skill Name is the only text input; level has a default value already.
    const nameField = screen.getByText('Skill Name').closest('label');
    const nameInput = nameField.querySelector('input');
    await userEvent.type(nameInput, 'TypeScript');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave.mock.calls[0][0].name).toBe('TypeScript');
    expect(onSave.mock.calls[0][0].level).toBe('Intermediate');
  });

  it('calls onClose when the Cancel button is clicked', async () => {
    const { onClose } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a select control for the skill level with its options', () => {
    setup();
    const levelLabel = screen.getByText('Skill Level').closest('label');
    const select = levelLabel.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('Intermediate');
    fireEvent.change(select, { target: { value: 'Expert' } });
    expect(select).toHaveValue('Expert');
  });

  it('renders the "Currently working here" checkbox for the experience type and clears endDate', async () => {
    render(
      <EntryModal type="experience" editingItem={null} open onClose={() => {}} onSave={() => {}} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByText('Currently working here')).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('renders the project image upload UI for the projects type', () => {
    render(
      <EntryModal type="projects" editingItem={null} open onClose={() => {}} onSave={() => {}} />
    );
    expect(screen.getByText('Project Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload Image' })).toBeInTheDocument();
  });

  it('pre-fills the form with the editing item values', () => {
    render(
      <EntryModal
        type="skills"
        editingItem={{ name: 'Go', level: 'Expert', years: '5' }}
        open
        onClose={() => {}}
        onSave={() => {}}
      />
    );
    const nameInput = screen.getByText('Skill Name').closest('label').querySelector('input');
    expect(nameInput).toHaveValue('Go');
  });
});
