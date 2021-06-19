const binary = require('./helpers/binary');
const enableCors = require('./helpers/enableCors');
const html = require('./helpers/html');
const file = require('./helpers/file');
const json = require('./helpers/json');
const redirect = require('./helpers/redirect');
const setBinaryResponse = require('./setters/setBinaryResponse');
const setBody = require('./setters/setBody');
const setHeader = require('./setters/setHeader');
const setStatusCode = require('./setters/setStatusCode');
const xml = require('./helpers/xml');

const buildResponse = (response) => ({
  getBody: () => response.body,
  getHeader: (name) => response.headers[name],
  getHeaders: () => response.headers,
  getResponse: () => response,
  getStatusCode: () => response.statusCode,
  setBinaryResponse: (value) => setBinaryResponse(response, value),
  setBody: (body) => setBody(response, body),
  setHeader: (name, value) => setHeader(response, name, value),
  setHeaders: (headers) => Object.keys(headers).map((name) => setHeader(response, name, headers[name])),
  setStatusCode: (value) => setStatusCode(response, value),
});

module.exports = () => {
  const response = buildResponse({
    body: undefined,
    headers: {},
    isBase64Encoded: false,
    statusCode: 200,
  });

  return Object.freeze({
    ...response,
    binary(body, contentType) {
      binary(response, body, contentType);

      return this;
    },
    enableCors: () => enableCors(response),
    file(filePath, contentType) {
      file(response, filePath, contentType);

      return this;
    },
    html(body) {
      html(response, body);

      return this;
    },
    json(body) {
      json(response, body);

      return this;
    },
    redirect(url, statusCode) {
      redirect(response, url, statusCode);

      return this;
    },
    xml(body) {
      xml(response, body);

      return this;
    },
  });
};
