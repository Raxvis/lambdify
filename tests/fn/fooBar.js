const lambdify = require('./../../src');

const run = () => ({ foo: 'bar' });

exports.handler = (event, context) => lambdify.run(event, context, run);
