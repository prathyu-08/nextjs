import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SectionCard from './SectionCard';

const tableItems = [
  { id: '1', name: 'React' },
  { id: '2', name: 'Node' },
];

function renderTable(props = {}) {
  return render(
    <SectionCard
      title="Skills"
      layout="table"
      columns={['Skill', 'Action']}
      addLabel="Add Skill"
      items={tableItems}
      renderItem={(item) => (
        <>
          <td>{item.name}</td>
          <td>action</td>
        </>
      )}
      onAdd={() => {}}
      {...props}
    />
  );
}

describe('SectionCard', () => {
  it('renders the title and add button', () => {
    renderTable();
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Skills' })).toBeInTheDocument();
  });

  it('calls onAdd when the add button is clicked', async () => {
    const onAdd = jest.fn();
    renderTable({ onAdd });
    await userEvent.click(screen.getByRole('button', { name: 'Add Skills' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  describe('table layout', () => {
    it('renders column headers', () => {
      renderTable();
      expect(screen.getByRole('columnheader', { name: 'Skill' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders a row per item via renderItem', () => {
      renderTable();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node')).toBeInTheDocument();
    });

    it('renders an empty message when there are no items', () => {
      renderTable({ items: [] });
      expect(
        screen.getByText('No skills added yet. Click the + button to add.')
      ).toBeInTheDocument();
    });
  });

  describe('timeline layout', () => {
    it('renders items', () => {
      render(
        <SectionCard
          title="Experience"
          layout="timeline"
          items={[{ id: 'a' }]}
          renderItem={() => <span>Timeline entry</span>}
          onAdd={() => {}}
        />
      );
      expect(screen.getByText('Timeline entry')).toBeInTheDocument();
    });

    it('renders empty text when no items', () => {
      render(
        <SectionCard
          title="Experience"
          layout="timeline"
          items={[]}
          renderItem={() => null}
          onAdd={() => {}}
        />
      );
      expect(
        screen.getByText('No experience added yet. Click the + button to add.')
      ).toBeInTheDocument();
    });
  });

  describe('grid layout', () => {
    it('renders items', () => {
      render(
        <SectionCard
          title="Projects"
          layout="grid"
          items={[{ id: 'p1' }]}
          renderItem={() => <span>Grid card</span>}
          onAdd={() => {}}
        />
      );
      expect(screen.getByText('Grid card')).toBeInTheDocument();
    });

    it('renders empty text when no items', () => {
      render(
        <SectionCard
          title="Projects"
          layout="grid"
          items={[]}
          renderItem={() => null}
          onAdd={() => {}}
        />
      );
      expect(
        screen.getByText('No projects added yet. Click the + button to add.')
      ).toBeInTheDocument();
    });
  });
});
