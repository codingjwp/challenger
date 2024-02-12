/** @type {import('ts-jest').JestConfigWithTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/fixJSDOMEnvironment.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist', '<rootDir>/public']
};

export default jestConfig;
