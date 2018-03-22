/* global test, expect */
const fn = require('./../src');

const requestObj = { test: 'this' };
const insertObj = {
	foo: 'bar',
	test: 'this',
};

const sleep = (params) => (
	new Promise((resolve) => {
		setTimeout(() => { resolve(params); }, 10);
	})
);

test('pipe handles multiple functions', async () => {
	await expect(fn.pipe(
		fn.log,
		fn.constant((output) => console.log(output)),
		sleep
	)(requestObj)).resolves.toEqual(requestObj);
});

test('constant returns params', async () => {
	await expect(fn.constant((output) => console.log(output))(requestObj)).resolves.toEqual(requestObj);
});

test('log returns params', async () => {
	await expect(fn.log(requestObj)).resolves.toEqual(requestObj);
});

test('insert handles arrays', async () => {
	await expect(fn.insert(3, () => ('x'))([1, 2, 3, 4])).resolves.toEqual([1, 2, 'x', 3, 4]);
});

test('insert handles arrays with promise', async () => {
	await expect(fn.insert(3, () => sleep('x'))([1, 2, 3, 4])).resolves.toEqual([1, 2, 'x', 3, 4]);
});

test('insert handles objects', async () => {
	await expect(fn.insert('foo', () => ('bar'))(requestObj)).resolves.toEqual(insertObj);
});

test('insert handles objects with promise', async () => {
	await expect(fn.insert('foo', () => sleep('bar'))(requestObj)).resolves.toEqual(insertObj);
});

test('lens handles arrays', async () => {
	await expect(fn.lens((value) => (value + 1))([1, 2, 3, 4])).resolves.toEqual([2, 3, 4, 5]);
});

test('lens handles arrays with promise', async () => {
	await expect(fn.lens((value) => (value + 1))([1, 2, 3, 4])).resolves.toEqual([2, 3, 4, 5]);
});

test('lens handles objects', async () => {
	await expect(fn.lens(() => 'bar')(requestObj)).resolves.toEqual({ test: 'bar' });
});

test('lens handles objects with promise', async () => {
	await expect(fn.lens((value) => sleep(value))(requestObj)).resolves.toEqual(requestObj);
});