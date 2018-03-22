import withRetry from './../withRetry';

const options = {
	baseDelay: 100,
	retryAttempts: 3,
	retryCount: 0,
	retryStrategy: 'exponential',
};

export const retry = (fn, ...args) => (
	withRetry(options)(fn, ...args)
);

export default retry;