import { json } from './response';
import payload from './payload';
import request from './request';

export const runner = (event, context, fn) => {
	new Promise(async (resolve) => {
		try {
			const responseObject = await fn(request(event, context));

			if (responseObject.body || responseObject.headers || responseObject.statusCode) {
				resolve(responseObject);
			} else {
				resolve(json(payload(responseObject)));
			}
		} catch (error) {
			console.log(error);
			resolve(json(payload({}, error)));
		}
	}).then((data) => context.succeed(data));
};

export default runner;