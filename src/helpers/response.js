const response = (body, type = 'application/json', options = {}) => ({
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

module.exports = response;
