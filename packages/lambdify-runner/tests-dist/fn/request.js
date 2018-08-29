const runner = require('./../../src');

const run = (request) => ({ request: request.body });

exports.handler = (event, context) => runner.run(event, context, run);
