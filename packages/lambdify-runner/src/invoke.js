import context from './context';

export const invoke = (event, handler) => (
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

	})
);

export default invoke;