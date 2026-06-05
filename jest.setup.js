import '@testing-library/jest-dom';
const React = require('react');

// App Router hooks/components need a runtime context jsdom doesn't have, so mock
// them once for every test. Tests read the router spy via global.__router.
const routerMock = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => routerMock,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

global.__router = routerMock;

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) =>
    React.createElement('a', { href: typeof href === 'string' ? href : '#', ...props }, children),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) =>
    React.createElement('img', { src: typeof src === 'string' ? src : '', alt: alt || '', ...props }),
}));

afterEach(() => {
  jest.clearAllMocks();
});
