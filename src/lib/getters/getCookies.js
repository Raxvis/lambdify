const cookie = require('cookie');
const get = require('./../get');

module.exports = (event) =>
  cookie.parse(get(event, 'headers.Cookie', get(event, 'headers.cookie', '')));
