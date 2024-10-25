const get = require('./../get');
const parseJson = require('./../parseJson');

module.exports = (event) => {
  const body = get(event, 'body');

  if (body && event.isBase64Encoded) {
    return parseJson(Buffer.from(body, 'base64').toString());
  }

  return parseJson(get(event, 'body', '{}'));
};
