const { response } = require('./../helpers');

const html = (options) => async (req, res, next) => {
	const body = await next(req, res);

	return response(`${body}`, 'text/html', options);
};

module.exports = html;
