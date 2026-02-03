import type { Config } from 'jest';
const config: Config  = {
	rootDir: '.',
	moduleFileExtensions: ['ts',  'js', 'json'],
	testEnvironment: 'node',
	testRegex: ".*\\.spec\\.ts$",
	
	 transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
	transformIgnorePatterns: [
  "/node_modules/(?!(uuid)/)"
],
 collectCoverageFrom: ['**/*.{ts,js}'],
  coverageDirectory: '../coverage',
moduleNameMapper: {
  '^src/(.*)$': '<rootDir>/src/$1',
},

	 setupFiles: ['reflect-metadata'],
  
	clearMocks: true,
	logHeapUsage: true,
	coverageProvider: 'v8',
coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};


export default config;