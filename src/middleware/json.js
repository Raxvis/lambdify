const { response } = require('./../helpers');

const json = (options) => async (req, res, next) =>
	response(JSON.stringify(await next(req, res), null, 4), 'application/json', options);

module.exports = json;
