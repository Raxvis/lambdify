const { response } = require('./../helpers');

const xml = (options) => async (req, res, next) => {
	const body = await next(req, res);

	return response(`${body}`, 'text/xml', options);
};

module.exports = xml;
