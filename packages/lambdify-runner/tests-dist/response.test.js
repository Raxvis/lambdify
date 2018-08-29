/* global test, expect */

const runner = require('./../dist');
const response = { test: 'this' };

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
