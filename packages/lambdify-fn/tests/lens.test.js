/* global test, expect */

const fn = require('./../src');
const requestObj = { test: 'this' };
const sleep = (params) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(params);
		}, 10);
	});

test('lens handles arrays', async () => {
	await expect(fn.lens((value) => value + 1)([1, 2, 3, 4])).resolves.toEqual([2, 3, 4, 5]);
});

test('lens handles arrays with promise', async () => {
	await expect(fn.lens((value) => value + 1)([1, 2, 3, 4])).resolves.toEqual([2, 3, 4, 5]);
});

test('lens handles objects', async () => {
	await expect(fn.lens(() => 'bar')(requestObj)).resolves.toEqual({ test: 'bar' });
});

test('lens handles objects with promise', async () => {
	await expect(fn.lens((value) => sleep(value))(requestObj)).resolves.toEqual(requestObj);
});
