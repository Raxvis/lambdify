const lambdify = require('./../../src');

const run = (request) => ({ request: request.body });

exports.handler = (event, context) => lambdify.run(event, context, run);
