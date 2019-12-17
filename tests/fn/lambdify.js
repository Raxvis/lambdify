const lambdify = require('./../../index');

const run = (req, res) => res.json({ foo: 'bar' });

exports.handler = lambdify(run);
