/* global test, expect */

const fn = require('./../src');
const requestObj = { test: 'this' };
const sleep = (params) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(params);
		}, 10);
	});

test('pipe handles multiple functions', async () => {
	await expect(fn.pipe(fn.log, fn.constant((output) => console.log(output)), sleep)(requestObj)).resolves.toEqual(requestObj);
});
