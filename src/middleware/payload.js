const { payload, response } = require('./../helpers');

const defaultPayload = (options) => async (req, res, next) =>
	response(JSON.stringify(payload(await next(req, res)), null, 4), 'application/json', options);

module.exports = defaultPayload;
