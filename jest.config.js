const nextJest = require('next/jest');

// next/jest wires up the SWC transform, CSS Modules, `.env.local` loading and
// the project's module resolution so we don't need a Babel config.
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // Co-located tests live next to source as *.test.js / *.test.jsx.
  testMatch: ['**/*.test.js', '**/*.test.jsx'],
  // Coverage focuses on the session library + the route/client we touched.
  collectCoverageFrom: [
    'lib/session/**/*.{js,jsx}',
    'lib/server/session.js',
    'lib/api/client.js',
    'app/api/**/route.js',
  ],
};

module.exports = createJestConfig(customConfig);
