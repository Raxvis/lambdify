const response = require('./response');

module.exports = (res, body) =>
  response(res, JSON.stringify(body), 'application/json');
