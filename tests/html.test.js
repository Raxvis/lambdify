const response = require('./../src/lib/response');
const encode = require('./../src/lib/helpers/encode');

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

test('html response with binary', () => {
	const res = response();
	const html = `<h1>hello world</h1>`;

	res.setBinaryResponse(true);
	res.html(html);

	expect(res.getResponse()).toEqual({
		body: encode(html),
		headers: { 'Content-Type': 'text/html' },
		isBase64Encoded: true,
		statusCode: 200,
	});
});
