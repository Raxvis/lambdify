const lambdify = require('./../src');

const response = { test: 'this' };

test('parsePayload parses correctly', () => {
	const output = lambdify.payload(response);
	const parsed = lambdify.parsePayload(output);

	expect(parsed).toEqual(response);
});

test('parsePayload handles errors', () => {
	expect(() => lambdify.parsePayload({ errorMessage: 'error-message' })).toThrow('error-message');
	expect(() => lambdify.parsePayload({ message: 'error-message', status: 'error' })).toThrow('error-message');
});
