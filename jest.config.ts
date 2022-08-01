export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts}',
    '!**/node_modules/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/**/protocols/**',
    '!<rootDir>/src/infra/db/database/**',
    '!<rootDir>/src/infra/db/ormconfig.ts',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}