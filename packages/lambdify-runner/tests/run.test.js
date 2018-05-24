/* global test, expect */

const runner = require('./../src');
const response = { test: 'this' };

test('run returns correct payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => (response));
	});

	expect(JSON.parse(res.body)).toEqual(runner.payload(response));
	expect(JSON.parse(res.body).payload).toEqual(response);
});

test('run returns correctly with no payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => { console.log('not returning payload'); });
	});

	expect(JSON.parse(res.body)).toEqual(runner.payload({}));
	expect(JSON.parse(res.body).payload).toEqual({});
});

test('run returns correctly with response payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => runner.json({}));
	});

	expect(JSON.parse(res.body)).toEqual({});
});

test('run handles error', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => { throw new Error('basic error'); });
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler', async () => {
	const run = runner.catchError((event) => ({ body: event }));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => { throw new Error('basic error'); });
	});

	expect(res.body.test).toEqual('this');
});

test('run with custom error handler and send back json', async () => {
	const run = runner.catchError((event) => console.log(event));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => { throw new Error('basic error'); });
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler and return invalid response', async () => {
	const run = runner.catchError(() => ({}));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => { throw new Error('basic error'); });
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});
