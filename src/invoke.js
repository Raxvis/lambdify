const context = (resolve) => ({ succeed: (response) => resolve(response) });

/**
 * Invokes a local lambda function simulated as a lambda proxy request
 *
 * @function
 * @since 3.1.0
 * @param {Object} event The lambda proxy event.
 * @param {string|function} handler The file path to the handler. (use dot notation for specific module)
 * @returns {Object} Returns a response from the invoked lambda function.
 * @example
 *
 *
 * import { invoke } from 'lambdify';
 *
 * const event = { path: '/foo' };
 *
 * await invoke(event, './index.handler');
 * // => { statusCode: 200, body: '' }
 *
 *
 * const handler = (event, context) => context.succeed('bar');
 * await invoke(event, handler);
 * // => 'bar'
 *
 */

const invoke = (event, handler) =>
	new Promise((resolve, reject) => {
		if (typeof handler === 'string') {
			const [file, handle] = handler.split('.');
			const fn = require(file);

			fn[handle](event, context(resolve, reject));
		} else if (typeof handler === 'function') {
			handler(event, context(resolve, reject));
		} else {
			reject(new Error('No valid handler passed to invoke'));
		}
	});

module.exports = invoke;
