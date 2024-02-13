/** @type {import('ts-jest').JestConfigWithTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/fixJSDOMEnvironment.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/__mocks__/imageFileMock.ts'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist', '<rootDir>/public', '<rootDir>/src/__tests__/exampleRouter.tsx']
};

export default jestConfig;
