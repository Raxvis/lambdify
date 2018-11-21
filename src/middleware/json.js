const { response } = require('./../helpers');

const json = (options) => async (req, res, next) => {
	const body = await next(req, res);

	return response(JSON.stringify(body, null, 4), 'application/json', options);
};

module.exports = json;
