const response = require('./response');

/**
 * Creates an HTML AWS Lambda proxy response payload
 * Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
 *
 * @function
 * @since 3.1.0
 * @category runner
 * @param {Object} body The response being sent back to the client
 * @param {Object} options Any options that should be merged into the final response
 * @returns {Object} Lambda Proxy response object
 * @example
 *
 *
 * import { html } from 'lambdify';
 *
 * exports.handler = (event, context) => context.succeed(
 * 	html('<h1>Hello World</h1>')
 * );
 *
 */

const html = (body, options) => response(`${body}`, 'text/html', options);

module.exports = html;
