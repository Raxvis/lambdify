const catchError = require('./catchError');

/**
 * Processes the AWS Lambda Proxy event, executes a function, and returns a standard Lambdify response
 * Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
 *
 * @function
 * @since 3.1.0
 * @param {Object} event The AWS Lambda Event
 * @param {Object} context The AWS Lambda Context
 * @param {Function} fn The function you wish to execute
 * @returns {Object} Lambda Proxy response object
 * @example
 *
 *
 * import { run } from 'lambdify';
 *
 * const myFN = (request) => {
 * 	if (request.method === 'POST') {
 * 		return { foo: 'bar' };
 * 	}
 *
 * 	return { foo: 'baz' };
 * }
 *
 * exports.handler = (event, context) => run(event, context, myFN);
 *
 */

const run = catchError((event, error) => console.log(error));

module.exports = run;
