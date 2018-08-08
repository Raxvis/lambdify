module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['packages/*/src/**.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
	coverageDirectory: './coverage/',
	coverageReporters: ['lcov'],
};
