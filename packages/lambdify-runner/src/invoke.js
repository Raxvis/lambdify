import context from './context';

export const invoke = (event, handler) => (
	new Promise((resolve, reject) => {
		const [file, handle] = handler.split('.');
		const fn = require(file);

		fn[handle](event, context(resolve, reject));
	})
);

export default invoke;