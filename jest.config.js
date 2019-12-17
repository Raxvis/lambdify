module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['helpers/**/*.js', 'lib/**/*.js', 'router/**/*.js', '!**/node_modules/**', '!**/vendor/**'],
	coverageDirectory: './coverage/',
	coverageReporters: ['lcov'],
};
