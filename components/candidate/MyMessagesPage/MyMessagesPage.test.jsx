import { render, screen, fireEvent } from '@testing-library/react';
import MyMessagesPage from './MyMessagesPage';

describe('MyMessagesPage', () => {
  it('renders the header and conversation list', () => {
    render(<MyMessagesPage />);
    expect(screen.getByRole('heading', { name: 'My Messages' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search messages...')).toBeInTheDocument();
    expect(screen.getAllByText('Re: UI/UX Designer Position').length).toBeGreaterThan(0);
    expect(screen.getByText('Interview Invitation')).toBeInTheDocument();
    expect(screen.getByText('Application Update')).toBeInTheDocument();
  });

  it('shows unread badges only for conversations with unread messages', () => {
    render(<MyMessagesPage />);
    // first conversation has 2 unread, third has 1; the second has none
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows the first conversation in the chat header by default', () => {
    render(<MyMessagesPage />);
    // "Multimedia Design" appears in conv list AND chat header
    expect(screen.getAllByText('Multimedia Design').length).toBeGreaterThanOrEqual(2);
    // subject shown in chat header
    expect(screen.getAllByText('Re: UI/UX Designer Position').length).toBeGreaterThanOrEqual(2);
  });

  it('renders the message thread bubbles', () => {
    render(<MyMessagesPage />);
    expect(screen.getByText(/Thank you for applying for our UI\/UX Designer position/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm very excited about this opportunity/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
  });

  it('switches the active chat when another conversation is clicked', () => {
    render(<MyMessagesPage />);
    // Before: "Connect People" appears once (conv list only)
    expect(screen.getAllByText('Connect People')).toHaveLength(1);
    fireEvent.click(screen.getByText('Interview Invitation'));
    // now also shown in the chat header, so it appears twice
    expect(screen.getAllByText('Connect People')).toHaveLength(2);
  });
});
