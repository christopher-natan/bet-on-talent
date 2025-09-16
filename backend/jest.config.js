/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/main.ts',
    '!src/**/*.module.ts'
  ],
  coverageDirectory: 'coverage',
};

