const cookie = require('cookie');
const get = require('lodash.get');

module.exports = (event) => cookie.parse(get(event, 'headers.Cookie', ''));
