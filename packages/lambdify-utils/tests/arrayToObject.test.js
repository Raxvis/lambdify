/* global test, expect */

const utils = require('./../src');

const testArray = [
	{
		foo: 'bar',
		test: 'this',
	},
	{
		foo: 'baz',
		test: 'this',
	},
];

test('array to object', () => {
	const response = utils.ato(testArray);

	expect(response[0].foo).toMatch('bar');
});

test('array to object with key', () => {
	const response = utils.ato(testArray, 'foo');

	expect(response.bar.foo).toMatch('bar');
});

test('array to object with key function', () => {
	const response = utils.ato(testArray, (record) => `foo${record.foo}`);

	expect(response.foobar.foo).toMatch('bar');
});

test('array to object with key and mergeFN', () => {
	const response = utils.ato(testArray, 'foo', (a, b) => (b ? b : a));

	expect(response.bar.foo).toMatch('bar');
});