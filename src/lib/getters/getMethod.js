const get = require('./../get');

module.exports = (event) => {
  const method = get(event, 'requestContext.httpMethod', '').toUpperCase();

  if (method) {
    return method;
  }

  return get(event, 'httpMethod', '').toUpperCase();
};
