import { render, screen, fireEvent } from '@testing-library/react';
import {
  IMG,
  Shell,
  Card,
  CardHead,
  Input,
  Sel,
  TemplatePanel,
  TemplateButton,
  TemplateField,
  TextBox,
  SelectBox,
  TemplateGrid,
} from './_shared';

describe('_shared exports', () => {
  it('exports the IMG base url constant', () => {
    expect(IMG).toBe('https://www.sharjeelanjum.com/html/jobs-portal/images');
  });

  describe('Shell', () => {
    it('renders its children', () => {
      render(
        <Shell path="/candidate/edit-profile">
          <p>shell child content</p>
        </Shell>
      );
      expect(screen.getByText('shell child content')).toBeInTheDocument();
    });

    it('renders title and subtitle when provided', () => {
      render(
        <Shell path="/candidate/x" title="My Title" subtitle="My subtitle">
          <span>child</span>
        </Shell>
      );
      expect(screen.getByRole('heading', { name: 'My Title' })).toBeInTheDocument();
      expect(screen.getByText('My subtitle')).toBeInTheDocument();
    });

    it('omits the header when no title is given', () => {
      render(
        <Shell path="/candidate/x">
          <span>child</span>
        </Shell>
      );
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });

    it('renders the candidate sidebar navigation', () => {
      render(
        <Shell path="/candidate/edit-profile" title="t">
          <span>child</span>
        </Shell>
      );
      // CandidateSidebar links
      expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Edit Profile/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Payment History/i })).toBeInTheDocument();
    });
  });

  describe('Card / CardHead', () => {
    it('renders card children and head title with action', () => {
      render(
        <Card>
          <CardHead title="Head Title" action={<button>Do thing</button>} />
          <p>card body</p>
        </Card>
      );
      expect(screen.getByRole('heading', { name: 'Head Title' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Do thing' })).toBeInTheDocument();
      expect(screen.getByText('card body')).toBeInTheDocument();
    });
  });

  describe('Input', () => {
    it('renders a labelled input with placeholder and default value', () => {
      render(<Input label="Email" placeholder="type here" defaultValue="hi@x.com" />);
      expect(screen.getByText('Email')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('type here');
      expect(input).toHaveValue('hi@x.com');
    });
  });

  describe('Sel', () => {
    it('renders a select with all options', () => {
      render(<Sel label="Type" opts={['One', 'Two', 'Three']} />);
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'One' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Two' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Three' })).toBeInTheDocument();
    });
  });

  describe('Template helpers', () => {
    it('TemplatePanel renders title, note, action and children', () => {
      render(
        <TemplatePanel title="Panel" note="some note" action={<button>act</button>}>
          <p>panel body</p>
        </TemplatePanel>
      );
      expect(screen.getByRole('heading', { name: 'Panel' })).toBeInTheDocument();
      expect(screen.getByText('some note')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'act' })).toBeInTheDocument();
      expect(screen.getByText('panel body')).toBeInTheDocument();
    });

    it('TemplateButton fires onClick', () => {
      const onClick = jest.fn();
      render(<TemplateButton onClick={onClick}>Click me</TemplateButton>);
      fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('TemplateField renders label and children', () => {
      render(
        <TemplateField label="Format">
          <TextBox defaultValue="abc" />
        </TemplateField>
      );
      expect(screen.getByText('Format')).toBeInTheDocument();
      expect(screen.getByDisplayValue('abc')).toBeInTheDocument();
    });

    it('SelectBox renders options and honors defaultValue', () => {
      render(<SelectBox opts={['PDF', 'DOCX']} defaultValue="DOCX" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('DOCX');
      expect(screen.getByRole('option', { name: 'PDF' })).toBeInTheDocument();
    });

    it('TemplateGrid renders children', () => {
      render(
        <TemplateGrid>
          <span>grid item</span>
        </TemplateGrid>
      );
      expect(screen.getByText('grid item')).toBeInTheDocument();
    });
  });
});
