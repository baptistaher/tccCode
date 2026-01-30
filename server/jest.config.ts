import type { Config } from 'jest';
const config: Config  = {
	moduleFileExtensions: ['ts',  'js', 'json'],
	rootDir: './src',
	testEnvironment: 'node',
	testRegex: ".*\\.spec\\.ts$",
	 transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },

	 setupFiles: ['reflect-metadata'],

	clearMocks: true,
	logHeapUsage: true,
	coverageProvider: 'v8',
coveragePathIgnorePatterns: ['/node_modules/'],
};


export default config;