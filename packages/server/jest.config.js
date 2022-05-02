/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  collectCoverageFrom: ['./src/**/*.ts'],
  coverageDirectory: './tests-coverage',
  collectCoverage: false,
};
