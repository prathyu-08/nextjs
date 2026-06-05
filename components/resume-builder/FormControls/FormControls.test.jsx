import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Field,
  TextInput,
  TextArea,
  SelectInput,
  SubmitButton,
  CancelButton,
} from './FormControls';

describe('Field', () => {
  it('renders the label text', () => {
    render(<Field label="Full Name">child</Field>);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('renders its children', () => {
    render(
      <Field label="Email">
        <input aria-label="email-input" />
      </Field>
    );
    expect(screen.getByLabelText('email-input')).toBeInTheDocument();
  });

  it('renders the error message when error is provided', () => {
    render(<Field label="Phone" error="This field is required">child</Field>);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not render an error message when error is falsy', () => {
    render(<Field label="Phone">child</Field>);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });
});

describe('TextInput', () => {
  it('passes through props and calls onChange when typing', async () => {
    const handleChange = jest.fn();
    render(<TextInput aria-label="name" value="" onChange={handleChange} />);
    const input = screen.getByLabelText('name');
    await userEvent.type(input, 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('reflects the value prop', () => {
    render(<TextInput aria-label="name" value="Jordan" onChange={() => {}} />);
    expect(screen.getByLabelText('name')).toHaveValue('Jordan');
  });
});

describe('TextArea', () => {
  it('passes through props and calls onChange when typing', async () => {
    const handleChange = jest.fn();
    render(<TextArea aria-label="summary" value="" onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText('summary'), 'x');
    expect(handleChange).toHaveBeenCalled();
  });

  it('reflects the value prop', () => {
    render(<TextArea aria-label="summary" value="hello" onChange={() => {}} />);
    expect(screen.getByLabelText('summary')).toHaveValue('hello');
  });
});

describe('SelectInput', () => {
  it('renders option children and reflects the value prop', () => {
    render(
      <SelectInput aria-label="level" value="Beginner" onChange={() => {}}>
        <option value="Beginner">Beginner</option>
        <option value="Expert">Expert</option>
      </SelectInput>
    );
    const select = screen.getByLabelText('level');
    expect(select).toHaveValue('Beginner');
    expect(screen.getByRole('option', { name: 'Expert' })).toBeInTheDocument();
  });

  it('calls onChange when an uncontrolled select value changes', () => {
    const handleChange = jest.fn();
    render(
      <SelectInput aria-label="level" defaultValue="Beginner" onChange={handleChange}>
        <option value="Beginner">Beginner</option>
        <option value="Expert">Expert</option>
      </SelectInput>
    );
    const select = screen.getByLabelText('level');
    fireEvent.change(select, { target: { value: 'Expert' } });
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('Expert');
  });
});

describe('SubmitButton', () => {
  it('renders children and is type submit', () => {
    render(<SubmitButton>Save</SubmitButton>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('forwards onClick', async () => {
    const onClick = jest.fn();
    render(<SubmitButton onClick={onClick}>Save</SubmitButton>);
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('CancelButton', () => {
  it('renders children and is type button', () => {
    render(<CancelButton>Cancel</CancelButton>);
    const button = screen.getByRole('button', { name: 'Cancel' });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('forwards onClick', async () => {
    const onClick = jest.fn();
    render(<CancelButton onClick={onClick}>Cancel</CancelButton>);
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
