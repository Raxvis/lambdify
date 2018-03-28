import { json } from './response';
import payload from './payload';
import request from './request';

const buildResponsePayload = (response) => {
	if (!response) {
		return json(payload({}));
	} else if (response.body || response.headers || response.statusCode) {
		return response;
	}
	return json(payload(response));
};

export const run = (event, context, fn) => {
	new Promise(async (resolve) => {
		try {
			const response = await fn(request(event, context));

			resolve(buildResponsePayload(response));
		} catch (error) {
			console.log(error);
			resolve(json(payload({}, error)));
		}
	}).then((data) => context.succeed(data));
};

export default run;