/* global test, expect */

const runner = require('./../dist');

test('runner loads all functions', () => {
	const keys = Object.keys(runner).sort();

	expect(keys).toEqual([
		'binary',
		'catchError',
		'default',
		'event',
		'html',
		'invoke',
		'json',
		'parsePayload',
		'payload',
		'redirect',
		'request',
		'response',
		'run',
		'xml',
	]);
});
