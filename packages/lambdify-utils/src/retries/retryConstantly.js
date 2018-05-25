import withRetry from './../withRetry';

const options = {
	baseDelay: 100,
	retryAttempts: 3,
	retryCount: 0,
	retryStrategy: 'constant',
};

export const retryConstantly = (fn, ...args) => withRetry(options)(fn, ...args);

export default retryConstantly;
