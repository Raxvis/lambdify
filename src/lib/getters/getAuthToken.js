const get = require('lodash.get');

module.exports = (event) =>
	get(event, 'headers.x-amz-security-token') || get(event, 'headers.X-Amz-Security-Token', '');
