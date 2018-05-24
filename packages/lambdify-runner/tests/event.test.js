/* global test, expect */

const runner = require('./../src');
const response = { test: 'this' };

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
