const lambdify = require('./../../src');

const run = () => {
	throw new Error('basic error');
};

exports.handler = (event, context) => lambdify.run(event, context, run);
