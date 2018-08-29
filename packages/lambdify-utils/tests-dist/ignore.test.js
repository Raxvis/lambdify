/* global test, expect */

const utils = require('./../dist');

test('ignore returns value', async () => {
	const response = await utils.ignore((input) => input)('test');

	expect(response).toMatch('test');
});

test('ignore error', async () => {
	const response = await utils.ignore(() => {
		throw new Error('failed');
	})();

	expect(response).toBe(undefined);
});

test('return error', async () => {
	const error = await utils.ignore(() => {
		throw new Error('failed');
	}, true)();

	expect(error.message).toMatch('failed');
});

test('return error and log', async () => {
	const error = await utils.ignore(
		() => {
			throw new Error('failed');
		},
		true,
		true,
	)();

	expect(error.message).toMatch('failed');
});
