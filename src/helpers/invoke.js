const context = (resolve, reject) => ({ fail: (error) => reject(error), succeed: (response) => resolve(response) });
const callback = (resolve, reject) => (error, success) => (error ? reject(error) : resolve(success));

const getHandler = (handler) => {
	if (typeof handler === 'string') {
		const [file, handle] = handler.split('.');
		const fn = require(file);

		return fn[handle];
	} else if (typeof handler === 'function') {
		return handler;
	}

	throw new Error('No valid handler passed to invoke');
};

const invoker = async (resolve, reject, fn) => {
	try {
		const response = await fn(event, context(resolve, reject), callback(resolve, reject));

		resolve(response);
	} catch (error) {
		reject(error);
	}
};

const invoke = async (event, handler) => {
	const fn = getHandler(handler);
	const response = await new Promise((resolve, reject) => invoker(resolve, reject, fn));

	return response;
};

module.exports = invoke;
