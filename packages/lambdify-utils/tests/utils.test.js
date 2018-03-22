/* global test, expect */

const utils = require('./../src');

let count;

const failXTimes = (times) => {
	count += 1;
	if (count < times) {
		throw new Error('Not failed enough yet');
	} else {
		return count;
	}
};

test('withRetry executes multiple times', async () => {
	count = 0;
	const response = await utils.withRetry()(failXTimes, 3);

	expect(response).toEqual(3);
});

test('retryConstantly executes multiple times', async () => {
	count = 0;
	const response = await utils.retryConstantly(failXTimes, 3);

	expect(response).toEqual(3);
});

test('retryImmediately executes multiple times', async () => {
	count = 0;
	const response = await utils.retryImmediately(failXTimes, 3);

	expect(response).toEqual(3);
});

test('retryLinearly executes multiple times', async () => {
	count = 0;
	const response = await utils.retryLinearly(failXTimes, 3);

	expect(response).toEqual(3);
});

test('withRetry fails if executes to many times', async () => {
	count = 0;

	try {
		await utils.withRetry()(failXTimes, 6);
	} catch (error) {
		expect(error.message).toMatch('Not failed enough yet');
	}
});

test('retry succeeds if executes 3 times or less', async () => {
	count = 0;

	const response = await utils.retry(failXTimes, 3);

	expect(response).toEqual(3);
});

test('retry fails if executes more than 3 times', async () => {
	count = 0;

	try {
		await utils.retry(failXTimes, 4);
	} catch (error) {
		expect(error.message).toMatch('Not failed enough yet');
	}
});