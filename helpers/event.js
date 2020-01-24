const event = (originalEvent = {}, body = {}, overrides = {}) => ({
	...originalEvent,
	...overrides,
	body: JSON.stringify(body),
	headers: {
		...originalEvent.headers,
		...overrides.headers,
	},
	pathParameters: {
		...originalEvent.pathParameters,
		...overrides.pathParameters,
	},
	queryStringParameters: {
		...originalEvent.queryStringParameters,
		...overrides.queryStringParameters,
	},
	requestContext: {
		...originalEvent.requestContext,
		...overrides.requestContext,
		identity: {
			...(originalEvent.requestContext ? originalEvent.requestContext.identity : {}),
			...(overrides.requestContext ? overrides.requestContext.identity : {}),
		},
	},
});

module.exports = event;
