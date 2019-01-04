const get = require('lodash.get');

module.exports = (event) => get(event, 'requestContext.httpMethod', '').toUpperCase();
