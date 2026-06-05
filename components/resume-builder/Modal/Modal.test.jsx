import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    render(
      <Modal open={false} title="My Modal" onClose={() => {}} onSubmit={() => {}}>
        <p>Body content</p>
      </Modal>
    );
    expect(screen.queryByText('My Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
  });

  it('renders title and children when open is true', () => {
    render(
      <Modal open title="My Modal" onClose={() => {}} onSubmit={() => {}}>
        <p>Body content</p>
      </Modal>
    );
    expect(screen.getByRole('heading', { name: 'My Modal' })).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Resume Builder')).toBeInTheDocument();
  });

  it('calls onClose when the close (X) button is clicked', async () => {
    const onClose = jest.fn();
    render(
      <Modal open title="My Modal" onClose={onClose} onSubmit={() => {}}>
        <p>Body</p>
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the overlay backdrop', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal open title="My Modal" onClose={onClose} onSubmit={() => {}}>
        <p>Body</p>
      </Modal>
    );
    // overlay is the outermost element with onMouseDown -> onClose
    const overlay = container.firstChild;
    fireEvent.mouseDown(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when interacting with the form content (stopPropagation)', () => {
    const onClose = jest.fn();
    render(
      <Modal open title="My Modal" onClose={onClose} onSubmit={() => {}}>
        <p>Inner body</p>
      </Modal>
    );
    fireEvent.mouseDown(screen.getByText('Inner body'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Modal open title="My Modal" onClose={() => {}} onSubmit={onSubmit}>
        <button type="submit">Go</button>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
