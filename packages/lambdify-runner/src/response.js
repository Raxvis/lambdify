export const response = (body, type = 'application/json', options = {}) => ({
	body,
	headers: {
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': '*',
		...options.headers,
		'Content-Type': type,
	},
	isBase64Encoded: options.binary,
	statusCode: options.statusCode || 200,
});
export const json = (body, options) => response(JSON.stringify(body, null, 4), 'application/json', options);
export const html = (body, options) => response(`${body}`, 'text/html', options);
export const xml = (body, options) => response(`${body}`, 'text/xml', options);
export const binary = (body, type, options) => response(body, type, {
	...options,
	binary: true,
});
export const redirect = (url) => response(null, 'text/html', {
	headers: { Location: url },
	statusCode: 302,
});

export default response;
