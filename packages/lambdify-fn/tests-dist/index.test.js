/* global test, expect */

const fn = require('./../dist');

test('fn loads all functions', () => {
	const keys = Object.keys(fn).sort();

	expect(keys).toEqual(['constant', 'default', 'insert', 'lens', 'log', 'pipe']);
});
