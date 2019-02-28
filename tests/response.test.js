/* eslint-disable max-statements */

// Event Sources: https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

const response = require('./../src/lib/response');
const encode = require('./../src/lib/helpers/encode');

test('binary response', () => {
	const res = response();
	const svg = `<?xml version="1.0"><svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="1" height="1" fill="black" /></svg>`;

	res.binary(encode(svg), 'image/svg+xml');

	expect(res.getResponse()).toEqual({
		body: Buffer.from(svg).toString('base64'),
		headers: { 'Content-Type': 'image/svg+xml' },
		isBase64Encoded: true,
		statusCode: 200,
	});
});

test('html response', () => {
	const res = response();
	const html = `<h1>hello world</h1>`;

	res.html(html);

	expect(res.getResponse()).toEqual({
		body: html,
		headers: { 'Content-Type': 'text/html' },
		isBase64Encoded: false,
		statusCode: 200,
	});
});

test('html response with base64', () => {
	const res = response();
	const html = encode(`<h1>hello world</h1>`);

	res.html(html);

	expect(res.getResponse()).toEqual({
		body: html,
		headers: { 'Content-Type': 'text/html' },
		isBase64Encoded: false,
		statusCode: 200,
	});
});

test('json response', () => {
	const res = response();
	const json = { foo: 'bar' };

	res.json(json);

	expect(res.getResponse()).toEqual({
		body: JSON.stringify(json),
		headers: { 'Content-Type': 'application/json' },
		isBase64Encoded: false,
		statusCode: 200,
	});
});

test('redirect response', () => {
	const res = response();

	res.redirect('https://example.com');

	expect(res.getResponse()).toEqual({
		body: undefined,
		headers: { Location: 'https://example.com' },
		isBase64Encoded: false,
		statusCode: 302,
	});
});

test('redirect response with statusCode', () => {
	const res = response();

	res.redirect('https://example.com', 301);

	expect(res.getResponse()).toEqual({
		body: undefined,
		headers: { Location: 'https://example.com' },
		isBase64Encoded: false,
		statusCode: 301,
	});
});

test('xml response', () => {
	const res = response();
	const xml = `<xml></xml>`;

	res.xml(xml);

	expect(res.getResponse()).toEqual({
		body: xml,
		headers: { 'Content-Type': 'text/xml' },
		isBase64Encoded: false,
		statusCode: 200,
	});
});

test('enableCors response', () => {
	const res = response();

	res.enableCors();

	expect(res.getResponse().headers['Access-Control-Allow-Credentials']).toEqual('true');
	expect(res.getResponse().headers['Access-Control-Allow-Origin']).toEqual('*');
});

test('set and get the body', () => {
	const res = response();

	res.setBody('test');

	expect(res.getBody()).toEqual('test');
});

test('set and get a header', () => {
	const res = response();

	res.setHeader('foo', 'bar');

	expect(res.getHeader('foo')).toEqual('bar');
	expect(res.getHeaders()).toEqual({ foo: 'bar' });
});

test('set and get headers', () => {
	const res = response();

	res.setHeaders({ foo: 'bar' });

	expect(res.getHeader('foo')).toEqual('bar');
	expect(res.getHeaders()).toEqual({ foo: 'bar' });
});

test('set and get the statusCode', () => {
	const res = response();

	res.setStatusCode(200);

	expect(res.getStatusCode()).toEqual(200);
});

test('set binaryResponse', () => {
	const res = response();

	res.setBinaryResponse(true);

	expect(res.getResponse()).toEqual({
		body: undefined,
		headers: {},
		isBase64Encoded: true,
		statusCode: 200,
	});
});
