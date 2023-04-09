module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['(services|packages)/**/*.(t|j)s'],
  moduleDirectories: ['node_modules'],
  coveragePathIgnorePatterns: [
    '.e2e-spec.(t|j)s',
    '.config.(t|j)s',
    'webpack.*.js',
    '.dto.ts',
    '.decorator.ts',
    '.filter.ts',
    '.middleware.ts',
    '.schema.ts',
    '.main.ts',
    '.module.ts',
    '.constants.ts',
    '.slice.ts',
    '.hook.ts',
    '.hooks.ts',
    'index.ts',
    'jest-e2e.js',
    '/__stubs__/',
    'styles.ts',
    '<rootDir>/packages/interfaces/',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/services/', '<rootDir>/packages/'],
  moduleNameMapper: {
    '^interfaces(|/.*)$': '<rootDir>/packages/interfaces/src/$1',
    '^nest-common(|/.*)$': '<rootDir>/packages/nest-common/src/$1',
  },
};

process.env = Object.assign(process.env, {
  TZ: 'UTC',
});
