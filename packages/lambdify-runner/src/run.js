import { json } from './response';
import payload from './payload';
import request from './request';

const buildResponsePayload = (response = {}, error) => {
	if (response.body || response.headers || response.statusCode) {
		return response;
	}

	return error ? json(payload({}, error)) : json(payload(response));
};

export const catchError = (errorFN) => (event, context, fn) => {
	new Promise(async (resolve) => {
		try {
			const response = await fn(request(event, context));

			resolve(buildResponsePayload(response));
		} catch (error) {
			const response = await errorFN(event, error);

			resolve(buildResponsePayload(response, error));
		}
	}).then((data) => context.succeed(data));
};

export const run = catchError((event, error) => console.log(error));

export default run;
