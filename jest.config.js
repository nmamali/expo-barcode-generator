module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
  coverageThreshold: { global: { statements: 95, branches: 95, functions: 95, lines: 95 } },
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: { '\\.jsx?$': 'babel-jest' },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"]
};
