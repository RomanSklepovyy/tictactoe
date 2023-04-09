// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('./jest.config');

module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['node_modules'],
  roots: ['<rootDir>/services/'],
  moduleNameMapper: mainConfig.moduleNameMapper,
};
