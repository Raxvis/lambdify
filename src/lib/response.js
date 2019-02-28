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

module.exports = () => {
	const res = {
		body: undefined,
		headers: {},
		isBase64Encoded: false,
		statusCode: 200,
	};

	return Object.freeze({
		binary(body, contentType) {
			binary(res, body, contentType);

			return this;
		},
		enableCors: () => enableCors(res),
		getBody: () => res.body,
		getHeader: (name) => res.headers[name],
		getHeaders: () => res.headers,
		getResponse: () => res,
		getStatusCode: () => res.statusCode,
		html(body) {
			html(res, body);

			return this;
		},
		json(body) {
			json(res, body);

			return this;
		},
		redirect(url, statusCode) {
			redirect(res, url, statusCode);

			return this;
		},
		setBinaryResponse: (value) => setBinaryResponse(res, value),
		setBody: (body) => setBody(res, body),
		setHeader: (name, value) => setHeader(res, name, value),
		setHeaders: (headers) => Object.keys(headers).map((name) => setHeader(res, name, headers[name])),
		setStatusCode: (value) => setStatusCode(res, value),
		xml(body) {
			xml(res, body);

			return this;
		},
	});
};
