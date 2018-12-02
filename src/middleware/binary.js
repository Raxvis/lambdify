const { response } = require('./../helpers');

const binary = (contentType, options) => async (req, res, next) =>
	response(await next(req, res), contentType, { ...options, binary: true });

module.exports = binary;
