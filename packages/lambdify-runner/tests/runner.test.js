/* global test, expect */

const runner = require('./../src');
const path = require('path');

const response = { test: 'this' };

test('runner loads all functions', () => {
	const keys = Object.keys(runner).sort();

	expect(keys).toEqual(['binary', 'context', 'default', 'event', 'html', 'invoke', 'json', 'payload', 'redirect', 'request', 'response', 'run', 'xml']);
});

test('payload loads object', () => {
	const output = runner.payload(response);

	expect(output.payload).toEqual(response);
});

test('payload loads custom error object', () => {
	const output = runner.payload(response, {
		code: 'NOT_FOUND',
		logLevel: 'error',
		message: 'Failed to find resource',
		name: 'NotFoundError',
		statusCode: 404,
		type: 'NOT_FOUND',
	});

	expect(output.error.code).toEqual('NOT_FOUND');
});

test('request loads event', () => {
	const req = runner.request(response);

	expect(req.event).toEqual(response);
});

test('request handles bad json', () => {
	const req = runner.request({ body: 'test' });

	expect(req.body).toEqual('test');
});

test('response.json return json response', () => {
	const res = runner.json(response);

	expect(JSON.parse(res.body)).toEqual(response);
});

test('response.html returns html response', () => {
	const res = runner.html('<html></html>');

	expect(res.body).toEqual('<html></html>');
});

test('response.xml returns xml response', () => {
	const res = runner.xml('<xml></xml>');

	expect(res.body).toEqual('<xml></xml>');
});

test('response.binary returns binary response', () => {
	const res = runner.binary();

	expect(res.isBase64Encoded).toEqual(true);
});

test('response.redirect returns redirect response', () => {
	const res = runner.redirect('https://google.com');

	expect(res.headers.Location).toEqual('https://google.com');
});

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

test('event handles standard event', () => {
	const event = runner.event({ path: '/test' });

	expect(event.path).toEqual('/test');
});

test('event body extends original event', () => {
	const event = runner.event({}, response);

	expect(JSON.parse(event.body)).toEqual(response);
});

test('event options extends original event', () => {
	const event = runner.event({ path: '/test' }, {}, { path: '/foo' });

	expect(event.path).toEqual('/foo');
});

test('event can extend identity', () => {
	const event = runner.event({}, {}, { requestContext: { identity: { ua: 'me' } } });

	expect(event.requestContext.identity.ua).toEqual('me');
});

test('event can override identity', () => {
	const event = runner.event({ requestContext: { identity: { ua: 'you' } } }, {}, { requestContext: { identity: { ua: 'me' } } });

	expect(event.requestContext.identity.ua).toEqual('me');
});

test('event has basic params', () => {
	const event = runner.event();

	expect(JSON.parse(event.body)).toEqual({});
});
