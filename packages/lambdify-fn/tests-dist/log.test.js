/* global test, expect */

const fn = require('./../dist');
const requestObj = { test: 'this' };

test('log returns params', async () => {
	await expect(fn.log(requestObj)).resolves.toEqual(requestObj);
});
