const { payload, response } = require('./../helpers');

const defaultPayload = (options) => async (req, res, next) => {
	const body = await next(req, res);

	return response(JSON.stringify(payload(body), null, 4), 'application/json', options);
};

module.exports = defaultPayload;
