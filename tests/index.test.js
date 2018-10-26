const lambdify = require('./../src');

test('lambdify loads all functions', () => {
	const keys = Object.keys(lambdify).sort();

	expect(keys).toEqual([
		'binary',
		'catchError',
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
