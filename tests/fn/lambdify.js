const lambdify = require('./../../src');

const run = (req, res) => res.json({ foo: 'bar' });

exports.handler = lambdify(run);
