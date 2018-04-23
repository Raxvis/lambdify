const runner = require('./../../src');

const run = () => {
	throw new Error('basic error');
};

exports.handler = (event, context) => runner.run(event, context, run);