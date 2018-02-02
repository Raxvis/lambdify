const get = (record, path, defaultValue) => ((path.match(/([^.[\]]+)/g) || []).reduce((result, piece) => (result && result[piece]), record) || defaultValue);

const parseJSON = (json) => {
	try {
		return JSON.parse(json);
	} catch (error) {
		return json;
	}
};

export const request = (event, context) => ({
	authToken: get(event, 'headers.x-amz-security-token', get(event, 'headers.X-Amz-Security-Token', '')),
	body: parseJSON(get(event, 'body', '{}')),
	context,
	event,
	headers: event.headers,
	ip: get(event, 'requestContext.identity.sourceIp', ''),
	method: get(event, 'requestContext.httpMethod', '').toUpperCase(),
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
});

export default request;