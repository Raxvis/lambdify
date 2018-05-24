/* global test, expect */

const runner = require('./../src');

const response = { test: 'this' };

test('payload loads object', () => {
	const output = runner.payload(response);

	expect(output.payload).toEqual(response);
});

test('payload loads custom error object', () => {
	const output = runner.payload(response, {
		code: 'NOT_FOUND',
		logLevel: 'error',
		message: 'Failed to find resource',
		name: 'NotFoundError',
		statusCode: 404,
		type: 'NOT_FOUND',
	});

	expect(output.error.code).toEqual('NOT_FOUND');
});