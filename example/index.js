const lambdify = require('lambdify');
const { catchError, payload, request } = require('lambidfy/middleware');

const run = (request) => ({ foo: 'bar', request });

exports.handler = lambdify([catchError(), request(), payload()], run);
