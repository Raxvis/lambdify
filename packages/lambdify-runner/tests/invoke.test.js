/* global test, expect */

const runner = require('./../src');
const path = require('path');
const response = { test: 'this' };

test('invoke calls local lambda function', async () => {
	const res = await runner.invoke(response, path.resolve(__dirname, 'fn/fooBar.handler'));

	expect(JSON.parse(res.body).payload).toEqual({ foo: 'bar' });
});

test('invoke handles function', async () => {
	const fn = require(path.resolve(__dirname, 'fn/fooBar'));
	const res = await runner.invoke(response, fn.handler);

	expect(JSON.parse(res.body).payload).toEqual({ foo: 'bar' });
});

test('invoke throws error if bad handler', () => {
	expect(runner.invoke(response, {})).rejects.toThrow();
});

test('invoke return correct data', async () => {
	const res = await runner.invoke({ body: JSON.stringify(response) }, path.resolve(__dirname, 'fn/request.handler'));

	expect(JSON.parse(res.body).payload).toEqual({ request: response });
});

test('invoke handles errors', async () => {
	const res = await runner.invoke(response, path.resolve(__dirname, 'fn/error.handler'));

	expect(JSON.parse(res.body).status).toEqual('error');
});
