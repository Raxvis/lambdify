const lambdify = require('./../src');
const response = { test: 'this' };

const removeTimestamp = (payload) => {
	delete payload.timestamp;

	return payload;
};

test('run returns correct payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		lambdify.run({}, context, () => response);
	});

	expect(removeTimestamp(JSON.parse(res.body))).toEqual(removeTimestamp(lambdify.payload(response)));
	expect(JSON.parse(res.body).payload).toEqual(response);
});

test('run returns correctly with no payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		lambdify.run({}, context, () => {
			console.log('not returning payload');
		});
	});

	expect(removeTimestamp(JSON.parse(res.body))).toEqual(removeTimestamp(lambdify.payload({})));
	expect(JSON.parse(res.body).payload).toEqual({});
});

test('run returns correctly with default response payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		lambdify.run({}, context, () => ({}));
	});

	expect(JSON.parse(res.body).payload).toEqual({});
});

test('run returns correctly with json response payload', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		lambdify.run({}, context, () => lambdify.json({}));
	});

	expect(JSON.parse(res.body)).toEqual({});
});

test('run handles error', async () => {
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		lambdify.run({}, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler', async () => {
	const run = lambdify.catchError((event) => ({ body: event }));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(res.body.test).toEqual('this');
});

test('run with custom error handler and send back json', async () => {
	const run = lambdify.catchError((event) => console.log(event));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});

test('run with custom error handler and return invalid response', async () => {
	const run = lambdify.catchError(() => ({}));
	const res = await new Promise((resolve) => {
		const context = { succeed: resolve };

		run(response, context, () => {
			throw new Error('basic error');
		});
	});

	expect(JSON.parse(res.body).status).toEqual('error');
});
