import withRetry from './../withRetry';

const options = {
	baseDelay: 100,
	retryAttempts: 3,
	retryCount: 0,
	retryStrategy: 'linear',
};

export const retryLinearly = (fn, ...args) => (
	withRetry(options)(fn, ...args)
);

export default retryLinearly;