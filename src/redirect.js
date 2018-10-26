const response = require('./response');

/**
 * Redirect to a url
 * Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
 *
 * @function
 * @since 3.1.0
 * @category runner
 * @param {String} url The url to be redirected too
 * @returns {Object} Lambda Proxy response object
 * @example
 *
 *
 * import { redirect } from 'lambdify';
 *
 * exports.handler = (event, context) => context.succeed(
 * 	redirect('https://google.com')
 * );
 *
 */

const redirect = (url) =>
	response(null, 'text/html', {
		headers: { Location: url },
		statusCode: 302,
	});

module.exports = redirect;
