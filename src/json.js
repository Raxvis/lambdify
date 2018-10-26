const response = require('./response');

/**
 * Creates an JSON AWS Lambda proxy response payload
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
 * import { json } from 'lambdify';
 *
 * exports.handler = (event, context) => context.succeed(
 * 	json({ foo: 'bar' })
 * );
 *
 */

const json = (body, options) => response(JSON.stringify(body, null, 4), 'application/json', options);

module.exports = json;
