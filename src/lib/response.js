const binary = require('./helpers/binary');
const enableCors = require('./helpers/enableCors');
const html = require('./helpers/html');
const json = require('./helpers/json');
const redirect = require('./helpers/redirect');
const setBinaryResponse = require('./setters/setBinaryResponse');
const setBody = require('./setters/setBody');
const setHeader = require('./setters/setHeader');
const setStatusCode = require('./setters/setStatusCode');
const xml = require('./helpers/xml');

const buildResponse = (res) => ({
	getBody: () => res.body,
	getHeader: (name) => res.headers[name],
	getHeaders: () => res.headers,
	getResponse: () => res,
	getStatusCode: () => res.statusCode,
	setBinaryResponse: (value) => setBinaryResponse(res, value),
	setBody: (body) => setBody(res, body),
	setHeader: (name, value) => setHeader(res, name, value),
	setHeaders: (headers) => Object.keys(headers).map((name) => setHeader(res, name, headers[name])),
	setStatusCode: (value) => setStatusCode(res, value),
});

module.exports = () => {
	const response = buildResponse({
		body: undefined,
		headers: {},
		isBase64Encoded: false,
		statusCode: 200,
	});

	return Object.freeze({
		...response,
		binary(body, contentType) {
			binary(response, body, contentType);

			return this;
		},
		enableCors: () => enableCors(response),
		html(body) {
			html(response, body);

			return this;
		},
		json(body) {
			json(response, body);

			return this;
		},
		redirect(url, statusCode) {
			redirect(response, url, statusCode);

			return this;
		},
		xml(body) {
			xml(response, body);

			return this;
		},
	});
};
