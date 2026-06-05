import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResumeBuilderProvider } from '../ResumeBuilderContext';

// NOTE: DashboardSidebar imports `UserPen` and `IdCard` from lucide-react, but
// those icons are `undefined` in the installed lucide-react version, which makes
// React throw "Element type is invalid" when rendering the component as-is.
// This is a real source/runtime bug (the page would crash in the app too). We
// stub lucide-react here so the rest of the component's behaviour is testable
// without modifying the source file.
jest.mock('lucide-react', () => {
  const React = require('react');
  return new Proxy(
    {},
    {
      get: () => (props) => React.createElement('span', { 'data-icon': true, ...props }),
    }
  );
});

// eslint-disable-next-line import/first
const DashboardSidebar = require('./DashboardSidebar').default;

if (!global.crypto || typeof global.crypto.randomUUID !== 'function') {
  global.crypto = {
    ...(global.crypto || {}),
    randomUUID: () => 'test-uuid-' + Math.random(),
  };
}

function renderWithProvider(ui) {
  return render(<ResumeBuilderProvider>{ui}</ResumeBuilderProvider>);
}

afterEach(() => localStorage.clear());

describe('DashboardSidebar', () => {
  it('renders the header info and nav items', () => {
    renderWithProvider(<DashboardSidebar />);
    expect(screen.getByRole('heading', { name: 'Job Seeker' })).toBeInTheDocument();
    expect(screen.getByText('jobseeker@jobsportal.com')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Build Resume')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders the "Open to Work" toggle checked by default and lets it be toggled', async () => {
    renderWithProvider(<DashboardSidebar />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('shows "Dark Mode" by default and switches to "Light Mode" when toggled', async () => {
    renderWithProvider(<DashboardSidebar />);
    const darkModeButton = screen.getByRole('button', { name: /Dark Mode/i });
    expect(darkModeButton).toBeInTheDocument();
    await userEvent.click(darkModeButton);
    expect(screen.getByRole('button', { name: /Light Mode/i })).toBeInTheDocument();
  });
});
