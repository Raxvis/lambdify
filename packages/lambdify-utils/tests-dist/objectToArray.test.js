/* global test, expect */

const utils = require('./../dist');

const testObject = {
	bar: {
		foo: 'bar',
		test: 'this',
	},
	baz: {
		foo: 'baz',
		test: 'this',
	},
};

test('object to array', () => {
	const response = utils.ota(testObject);

	expect(response[0].foo).toMatch('bar');
});

test('object to array with key', () => {
	const response = utils.ota(testObject, 'foobar');

	expect(response[0].foobar).toMatch('bar');
});
