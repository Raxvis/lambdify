/* global test, expect */

const runner = require('./../src');

test('runner loads all functions', () => {
	const keys = Object.keys(runner).sort();

	expect(keys).toEqual([
		'binary',
		'catchError',
		'context',
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
