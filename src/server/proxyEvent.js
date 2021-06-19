const getEventBody = require('./getEventBody');
const handleError = require('./handleError');
const handleRequestResponse = require('./handleRequestResponse');
const http = require('http');
const url = require('url');

const proxyEvent = (event, socketPath) =>
  new Promise((resolve) => {
    const requestOptions = {
      headers: event.headers,
      method: event.httpMethod,
      path: url.format({ pathname: event.path, query: event.queryStringParameters }),
      socketPath,
    };

    const req = http.request(requestOptions, async (res) => {
      try {
        const response = await handleRequestResponse(res);

        resolve(response);
      } catch (error) {
        resolve(handleError(error));
      }
    });

    if (event.body) {
      req.write(getEventBody(event));
    }

    req.on('error', (error) => resolve(handleError(error, 502)));
    req.end();
  });

module.exports = proxyEvent;
