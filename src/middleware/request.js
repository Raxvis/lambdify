const get = (record, path, defaultValue) =>
	path.match(/([^.[\]]+)/gu).reduce((result, piece) => result && result[piece], record) || defaultValue;

const parseJSON = (json) => {
	try {
		return JSON.parse(json);
	} catch (error) {
		return json;
	}
};

const lambdifyRequest = (event) => ({
	authToken: get(event, 'headers.x-amz-security-token', get(event, 'headers.X-Amz-Security-Token', '')),
	body: parseJSON(get(event, 'body', '{}')),
	headers: event.headers,
	ip: get(
		event,
		'headers.X-Forwarded-For',
		get(event, 'headers.x-forwarded-for', get(event, 'requestContext.identity.sourceIp', '')),
	).split(',')[0],
	method: get(event, 'requestContext.httpMethod', '').toUpperCase(),
	path: get(event, 'path', ''),
	pathParams: get(event, 'pathParameters', {}),
	queryParams: get(event, 'queryStringParameters', {}),
	s3: {
		bucket: get(event, 'Records.0.s3.bucket.name', ''),
		key: get(event, 'Records.0.s3.object.key', ''),
	},
	sns: {
		message: parseJSON(get(event, 'Records.0.Sns.Message', '{}')),
		subject: get(event, 'Records.0.Sns.Subject', ''),
	},
	sqs: get(event, 'Records', []).map(({ body }) => parseJSON(body)),
	ua: get(event, 'requestContext.identity.userAgent', ''),
});

module.exports = (userContext) => ({ event, context }, response, next) =>
	next(
		{
			context,
			event,
			...lambdifyRequest(event),
			...userContext,
		},
		response,
	);
