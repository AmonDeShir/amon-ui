const process = require('process');

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: [ '<rootDir>' ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [ 
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}', 
    '!<rootDir>/src/mocks/*.{ts,tsx,mdx}',
    '!<rootDir>/src/**/*.{story,d}.{ts,tsx,mdx}',
    '!<rootDir>/src/themes/*.ts',
    '!<rootDir>/src/index.ts'
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  testEnvironment: 'jsdom',
  resetMocks: true,
  rootDir: process.cwd()
}