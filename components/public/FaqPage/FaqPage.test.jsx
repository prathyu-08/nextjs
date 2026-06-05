import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqPage from './FaqPage';

describe('FaqPage', () => {
  it('renders the heading and the general category by default', () => {
    render(<FaqPage />);
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
    // first general question + its (open) answer
    expect(screen.getByText('What is JobsPortal?')).toBeInTheDocument();
    expect(screen.getByText(/comprehensive job marketplace/i)).toBeInTheDocument();
  });

  it('switches the question set when another category tab is clicked', async () => {
    const user = userEvent.setup();
    render(<FaqPage />);
    expect(screen.queryByText('How do I post a job?')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'employers' }));

    expect(screen.getByText('How do I post a job?')).toBeInTheDocument();
    expect(screen.queryByText('What is JobsPortal?')).not.toBeInTheDocument();
  });

  it('toggles an answer open/closed when its question is clicked', async () => {
    const user = userEvent.setup();
    render(<FaqPage />);
    // index 0 is open by default, so clicking it closes it
    await user.click(screen.getByText('What is JobsPortal?'));
    expect(screen.queryByText(/comprehensive job marketplace/i)).not.toBeInTheDocument();

    // open the second question
    await user.click(screen.getByText('Is JobsPortal free to use?'));
    expect(screen.getByText(/job seekers can create a free account/i)).toBeInTheDocument();
  });

  it('navigates to contact support', async () => {
    const user = userEvent.setup();
    render(<FaqPage />);
    await user.click(screen.getByRole('button', { name: /contact support/i }));
    expect(global.__router.push).toHaveBeenCalledWith('/public/contact');
  });
});
