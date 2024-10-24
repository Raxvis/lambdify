/*

This creates an http server (for use with express, koa, etc) and serve it through lambda

References:
https://github.com/zeit/now-builders/blob/fa411a5e4cb10de2ceafa30d335652a16d1963f4/packages/now-node-bridge/src/bridge.ts
https://github.com/awslabs/aws-serverless-express/blob/master/src/index.js

*/

const proxyEvent = require('./proxyEvent');
const getSocketPath = require('./getSocketPath');
const http = require('http');

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1); // eslint-disable-line no-process-exit
});

const proxyServer = (requestListener, closeOnEnd) => {
  const server = http.createServer(requestListener);
  const socketPath = getSocketPath();
  let serverIsListenting = false;

  server.on('listening', () => {
    serverIsListenting = true;
  });
  server.on('close', () => {
    serverIsListenting = false;
  });

  return async (event) => {
    if (!serverIsListenting) {
      await new Promise((resolve) => {
        server.listen(socketPath).on('listening', resolve);
      });
    }

    const response = await proxyEvent(event, socketPath);

    if (closeOnEnd) {
      server.close();
    }

    return response;
  };
};

module.exports = proxyServer;
