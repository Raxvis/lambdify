const json = require('./json');
const payload = require('./payload');
const request = require('./request');

const buildResponsePayload = (response = {}, error) => {
	if (response.body || response.headers || response.statusCode) {
		return response;
	}

	return error ? json(payload({}, error)) : json(payload(response));
};

const catchError = (errorFN) => async (event, context, fn) => {
	try {
		const response = await fn(request(event, context));

		context.succeed(buildResponsePayload(response));
	} catch (error) {
		const response = await errorFN(event, error);

		context.succeed(buildResponsePayload(response, error));
	}
};

module.exports = catchError;
