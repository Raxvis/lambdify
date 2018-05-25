/* global test, expect */

const lambdify = require('./../src');

test('lambdify loads all functions', () => {
	const keys = Object.keys(lambdify).sort();

	expect(keys).toEqual([
		'arrayToObject',
		'ato',
		'binary',
		'catchError',
		'constant',
		'context',
		'default',
		'event',
		'fn',
		'html',
		'ignore',
		'insert',
		'invoke',
		'json',
		'lens',
		'log',
		'objectToArray',
		'ota',
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
