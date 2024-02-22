/** @type {import('ts-jest').JestConfigWithTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/fixJSDOMEnvironment.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/src/__mocks__/imageFileMock.ts',
    '@/(.*)$': '<rootDir>/src/$1',
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@modals/(.*)$': '<rootDir>/src/components/modals/$1',
    '@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@stores/(.*)$': '<rootDir>/src/stores/$1',
    '@util/(.*)$': '<rootDir>/src/util/$1',
    '@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist', '<rootDir>/public', '<rootDir>/src/__tests__/exampleRouter.tsx']
};

export default jestConfig;
