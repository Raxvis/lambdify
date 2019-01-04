const request = require('./lib/request');
const response = require('./lib/response');
const init = require('./lib/init');

const next = (fn, ...rest) => (req, res) => (fn ? fn(req, res, next(...rest)) : res);

module.exports = (fn, middleware = []) => (event, context) =>
	next(init, ...middleware, fn)(request(event, context), response());
