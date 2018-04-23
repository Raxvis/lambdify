const runner = require('./../../src');

const run = () => ({ foo: 'bar' });

exports.handler = (event, context) => runner.run(event, context, run);