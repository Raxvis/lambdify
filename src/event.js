/**
 * Builds a lambda proxy event and allows you to supply a body and / or overrides.  Useful for calling a second lambda function
 *
 * @function
 * @since 3.1.0
 * @param {Object} originalEvent The original lambda proxy event.
 * @param {Object|Array|string} body The body to set into the event.
 * @param {Object} overrides The overrides object allows you to selectively override the initial event
 * @returns {Object} Returns the new event
 * @example
 *
 *
 * import { event } from 'lambdify';
 *
 * const initialEvent = { path: '/foo' };
 *
 * event(initialEvent, { foo: 'bar' });
 * // => { path: '/foo', body: '{"foo":"bar"}' }
 *
 * event(initialEvent, {}, { path: '/bar' });
 * // => { path: '/bar' }
 *
 * event(initialEvent, {}, { queryStringParameters: { baz: 'bar' } });
 * // => { path: '/bar', queryStringParameters: { baz: 'bar' } }
 *
 */

const event = (originalEvent = {}, body = {}, overrides = {}) => ({
	...originalEvent,
	...overrides,
	body: JSON.stringify(body),
	headers: {
		...originalEvent.headers,
		...overrides.headers,
	},
	pathParameters: {
		...originalEvent.pathParameters,
		...overrides.pathParameters,
	},
	queryStringParameters: {
		...originalEvent.queryStringParameters,
		...overrides.queryStringParameters,
	},
	requestContext: {
		...originalEvent.requestContext,
		...overrides.requestContext,
		identity: {
			...(originalEvent.requestContext ? originalEvent.requestContext.identity : {}),
			...(overrides.requestContext ? overrides.requestContext.identity : {}),
		},
	},
});

module.exports = event;
