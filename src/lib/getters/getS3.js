const get = require('lodash.get');

module.exports = (event) => ({
	bucket: get(event, 'Records.0.s3.bucket.name', ''),
	key: get(event, 'Records.0.s3.object.key', ''),
});
