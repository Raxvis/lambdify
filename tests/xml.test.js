const response = require('./../src/lib/response');
const encode = require('./../src/lib/helpers/encode');

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

test('xml response with base64', () => {
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

test('xml response with binary', () => {
	const res = response();
	const xml = `<xml></xml>`;

	res.setBinaryResponse(true);
	res.xml(xml);

	expect(res.getResponse()).toEqual({
		body: encode(xml),
		headers: { 'Content-Type': 'text/xml' },
		isBase64Encoded: true,
		statusCode: 200,
	});
});
