const lambdify = require('./../src');
const response = { test: 'this' };

test('response.json return json response', () => {
	const res = lambdify.json(response);

	expect(JSON.parse(res.body)).toEqual(response);
});

test('response.html returns html response', () => {
	const res = lambdify.html('<html></html>');

	expect(res.body).toEqual('<html></html>');
});

test('response.xml returns xml response', () => {
	const res = lambdify.xml('<xml></xml>');

	expect(res.body).toEqual('<xml></xml>');
});

test('response.binary returns binary response', () => {
	const res = lambdify.binary();

	expect(res.isBase64Encoded).toEqual(true);
});

test('response.redirect returns redirect response', () => {
	const res = lambdify.redirect('https://google.com');

	expect(res.headers.Location).toEqual('https://google.com');
});
