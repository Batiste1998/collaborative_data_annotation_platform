module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.js'],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testTimeout: 30000,
  globals: {
    NODE_ENV: 'test'
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  globalSetup: './__tests__/globalSetup.js',
  globalTeardown: './__tests__/globalTeardown.js'
}