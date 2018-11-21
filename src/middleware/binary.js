const { response } = require('./../helpers');

const binary = (contentType, options) => async (req, res, next) => {
	const body = await next(req, res);

	return response(body, contentType, {
		...options,
		binary: true,
	});
};

module.exports = binary;
