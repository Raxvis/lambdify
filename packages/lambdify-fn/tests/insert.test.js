/* global test, expect */

const fn = require('./../src');
const requestObj = { test: 'this' };
const insertObj = {
	foo: 'bar',
	test: 'this',
};
const sleep = (params) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(params);
		}, 10);
	});

test('insert handles arrays', async () => {
	await expect(fn.insert(3, () => 'x')([1, 2, 3, 4])).resolves.toEqual([1, 2, 'x', 3, 4]);
});

test('insert handles arrays with promise', async () => {
	await expect(fn.insert(3, () => sleep('x'))([1, 2, 3, 4])).resolves.toEqual([1, 2, 'x', 3, 4]);
});

test('insert handles objects', async () => {
	await expect(fn.insert('foo', () => 'bar')(requestObj)).resolves.toEqual(insertObj);
});

test('insert handles objects with promise', async () => {
	await expect(fn.insert('foo', () => sleep('bar'))(requestObj)).resolves.toEqual(insertObj);
});
