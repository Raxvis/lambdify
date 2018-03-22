/* global test, expect */

const runner = require('./../src');

const response = { test: 'this' };

test('runner loads all functions', () => {
	const keys = Object.keys(runner).sort();

	expect(keys).toEqual(['binary', 'default', 'html', 'json', 'payload', 'redirect', 'request', 'response', 'runner', 'xml']);
});

test('payload loads object', () => {
	const output = runner.payload(response);

	expect(output.payload).toEqual(response);
});

test('request loads event', () => {
	const req = runner.request(response);

	expect(req.event).toEqual(response);
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
