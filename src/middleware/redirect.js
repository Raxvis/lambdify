const { response } = require('./../helpers');

const redirect = (url) => async (req, res, next) => {
	await next(req, res);

	return response(null, 'text/html', {
		headers: { Location: url },
		statusCode: 302,
	});
};

module.exports = redirect;
