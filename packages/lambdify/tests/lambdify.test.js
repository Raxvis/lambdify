/* global test, expect */

const lambdify = require('./../src');

test('lambdify loads all functions', () => {
	const keys = Object.keys(lambdify).sort();

	expect(keys).toEqual([
		'binary',
		'constant',
		'default',
		'fn',
		'html',
		'insert',
		'json',
		'lens',
		'log',
		'payload',
		'pipe',
		'redirect',
		'request',
		'response',
		'retry',
		'retryConstantly',
		'retryImmediately',
		'retryLinearly',
		'run',
		'runner',
		'utils',
		'withRetry',
		'xml',
	]);
});