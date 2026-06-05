import { render, screen } from '@testing-library/react';
import JobBadge from './JobBadge';

describe('JobBadge', () => {
  it('renders the type text passed as a prop', () => {
    render(<JobBadge type="Full Time" />);
    expect(screen.getByText('Full Time')).toBeInTheDocument();
  });

  it.each([
    'Full Time',
    'Full Time/Permanent',
    'Contract',
    'Part Time',
    'Internship',
    'Freelance',
    'Remote',
  ])('renders the known badge variant %s', (type) => {
    render(<JobBadge type={type} />);
    expect(screen.getByText(type)).toBeInTheDocument();
  });

  it('renders an unknown/custom type using the default style', () => {
    render(<JobBadge type="Something Else" />);
    expect(screen.getByText('Something Else')).toBeInTheDocument();
  });
});
