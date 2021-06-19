const init = require('./lib/init');
const next = require('./lib/next');
const request = require('./lib/request');
const response = require('./lib/response');

module.exports =
  (fn, middleware = []) =>
  (event, context) =>
    next(init, ...middleware, fn)(request(event, context), response());
