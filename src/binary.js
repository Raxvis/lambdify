const response = require('./response');

/**
 * Creates an Binary AWS Lambda proxy response payload
 * Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
 *
 * @function
 * @since 3.1.0
 * @category runner
 * @param {Object} body The response being sent back to the client
 * @param {String} type The Content-Type being sent back
 * @param {Object} options Any options that should be merged into the final response
 * @returns {Object} Lambda Proxy response object
 * @example
 *
 *
 * import { binary } from 'lambdify';
 *
 * exports.handler = (event, context) => context.succeed(
 * 	binary(fs.readFileSync('image.png').toString('base64'), 'image/png')
 * );
 *
 */

const binary = (body, type, options) =>
	response(body, type, {
		...options,
		binary: true,
	});

module.exports = binary;
