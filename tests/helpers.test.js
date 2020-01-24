const helpers = require('./../src/helpers');

test('helpers - event basic creation', () => {
	const apiGatewayProxyEvent = require('./events/apiGatewayProxy.json');
	const event = helpers.event(apiGatewayProxyEvent);

	apiGatewayProxyEvent.body = JSON.stringify({});

	expect(event).toEqual(apiGatewayProxyEvent);
});

test('helpers - event body override', () => {
	const apiGatewayProxyEvent = require('./events/apiGatewayProxy.json');
	const event = helpers.event(apiGatewayProxyEvent, { foo: 'bar' });

	apiGatewayProxyEvent.body = JSON.stringify({ foo: 'bar' });

	expect(event).toEqual(apiGatewayProxyEvent);
});

test('helpers - event other overrides', () => {
	const apiGatewayProxyEvent = require('./events/apiGatewayProxy.json');
	const event = helpers.event(
		apiGatewayProxyEvent,
		{ foo: 'bar' },
		{ headers: { test: 'this' }, requestContext: { identity: { test: 'this' } } },
	);

	apiGatewayProxyEvent.body = JSON.stringify({ foo: 'bar' });
	apiGatewayProxyEvent.headers = { ...apiGatewayProxyEvent.headers, test: 'this' };
	apiGatewayProxyEvent.requestContext = {
		...apiGatewayProxyEvent.requestContext,
		identity: { ...apiGatewayProxyEvent.requestContext.identity, test: 'this' },
	};

	expect(event).toEqual(apiGatewayProxyEvent);
});

test('helpers - event only bodies', () => {
	const event = helpers.event(undefined, { foo: 'bar' });

	expect(JSON.parse(event.body)).toEqual({ foo: 'bar' });
});

test('helpers - invoke with require using lambdify', async () => {
	const fn = require('./fn/lambdify').handler;
	const response = await helpers.invoke({}, fn);

	expect(JSON.parse(response.body)).toEqual({ foo: 'bar' });
});

test('helpers - invoke with no handler', async () => {
	const fn = require('./fn/lambdify');

	await expect(helpers.invoke({}, fn)).rejects.toEqual(new Error('No valid handler passed to invoke'));
});

test('helpers - invoke with context.succeed', async () => {
	const fn = require('./fn/contextSucceed').handler;
	const response = await helpers.invoke({}, fn);

	expect(response).toEqual({ foo: 'bar' });
});

test('helpers - invoke with context.fail', async () => {
	const fn = require('./fn/contextFail').handler;

	await expect(helpers.invoke({}, fn)).rejects.toEqual(new Error('failed'));
});

test('helpers - invoke with callback succeed', async () => {
	const fn = require('./fn/callbackSucceed').handler;
	const response = await helpers.invoke({}, fn);

	expect(response).toEqual({ foo: 'bar' });
});

test('helpers - invoke with callback fail', async () => {
	const fn = require('./fn/callbackFail').handler;

	await expect(helpers.invoke({}, fn)).rejects.toEqual(new Error('failed'));
});

test('helpers - invoke with failed function', async () => {
	const fn = require('./fn/fail').handler;

	await expect(helpers.invoke({}, fn)).rejects.toEqual(new Error('failed'));
});
