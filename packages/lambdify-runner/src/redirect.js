import response from './response';

/**
 * Redirect to a url
 * Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
 *
 * @function
 * @since 3.1.0
 * @category runner
 * @param {String} url The url to be redirected too
 * @param {Tnt} statusCode The status code sent in the response which defaults to 302
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

export const redirect = (url, statusCode = 302) =>
	response(null, 'text/html', {
		headers: { Location: url },
		statusCode,
	});

export default redirect;
