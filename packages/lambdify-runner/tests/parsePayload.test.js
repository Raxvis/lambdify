/* global test, expect */

const runner = require('./../src');

const response = { test: 'this' };

test('parsePayload parses correctly', () => {
	const output = runner.payload(response);
	const parsed = runner.parsePayload(output);

	expect(parsed).toEqual(response);
});

test('parsePayload handles errors', () => {
	expect(() => runner.parsePayload({ errorMessage: 'error-message' })).toThrow('error-message');
	expect(() => runner.parsePayload({ message: 'error-message', status: 'error' })).toThrow('error-message');
});
