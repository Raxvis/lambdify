export const event = (originalEvent = {}, body = {}, options = {}) => ({
	...originalEvent,
	...options,
	body: JSON.stringify(body),
	headers: {
		...originalEvent.headers,
		...options.headers,
	},
	pathParameters: {
		...originalEvent.pathParameters,
		...options.pathParameters,
	},
	queryStringParameters: {
		...originalEvent.queryStringParameters,
		...options.queryStringParameters,
	},
	requestContext: {
		...originalEvent.requestContext,
		...options.requestContext,
	},
});

export default event;