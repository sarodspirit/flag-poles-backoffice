module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: ['**/test/**/*.test.ts'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/lib/', '/node_modules/'],
	collectCoverage: true,
};
