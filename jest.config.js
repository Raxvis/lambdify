module.exports = {
	collectCoverageFrom: [
		'packages/*/dist/**.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['lcov'],
};