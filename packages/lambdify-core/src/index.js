require('babel-polyfill');
require('babel-register')({
	plugins: [
		"babel-plugin-transform-async-to-generator",
		"babel-plugin-transform-es2015-modules-commonjs",
		"babel-plugin-transform-object-rest-spread"
	]
});

const deploy = require('./deploy.js');

module.exports = deploy;