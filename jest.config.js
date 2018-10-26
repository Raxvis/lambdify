module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
	coverageDirectory: './coverage/',
	coverageReporters: ['lcov'],
};
