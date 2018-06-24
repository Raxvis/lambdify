/* global test, expect */

const runner = require('./../src');
const response = { test: 'this' };

const removeTimestamp = (payload) => {
	delete payload.timestamp;

	return payload;
};

test('run returns correct payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => response);
	});

	expect(removeTimestamp(JSON.parse(res.body))).toEqual(removeTimestamp(runner.payload(response)));
	expect(JSON.parse(res.body).payload).toEqual(response);
});

test('run returns correctly with no payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => {
			console.log('not returning payload');
		});
	});

	expect(removeTimestamp(JSON.parse(res.body))).toEqual(removeTimestamp(runner.payload({})));
	expect(JSON.parse(res.body).payload).toEqual({});
});

test('run returns correctly with default response payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => ({}));
	});

	expect(JSON.parse(res.body).payload).toEqual({});
});

test('run returns correctly with json response payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => runner.json({}));
	});

	expect(JSON.parse(res.body)).toEqual({});
});

test('run handles error', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		runner.run({}, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler', async () => {
	const run = runner.catchError((event) => ({ body: event }));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(res.body.test).toEqual('this');
});

test('run with custom error handler and send back json', async () => {
	const run = runner.catchError((event) => console.log(event));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler and return invalid response', async () => {
	const run = runner.catchError(() => ({}));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});
