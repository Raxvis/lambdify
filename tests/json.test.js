const response = require('./../lib/response');
const encode = require('./../lib/helpers/encode');

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

test('json response with binary', () => {
	const res = response();
	const json = { foo: 'bar' };

	res.setBinaryResponse(true);
	res.json(json);

	expect(res.getResponse()).toEqual({
		body: encode(JSON.stringify(json)),
		headers: { 'Content-Type': 'application/json' },
		isBase64Encoded: true,
		statusCode: 200,
	});
});
