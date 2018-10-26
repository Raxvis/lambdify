/**
 * Creates an AWS Lambda proxy response payload
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
 * import { response } from 'lambdify';
 *
 * exports.handler = (event, context) => context.succeed(
 * 	response(
 * 		JSON.stringify({ foo: 'bar' })
 * 	)
 * );
 *
 */

const response = (body, type = 'application/json', options = {}) => ({
	body,
	headers: {
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': '*',
		...options.headers,
		'Content-Type': type,
	},
	isBase64Encoded: options.binary,
	statusCode: options.statusCode || 200,
});

module.exports = response;
