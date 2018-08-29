/* global test, expect */

const fn = require('./../dist');
const requestObj = { test: 'this' };

test('constant returns params', async () => {
	await expect(fn.constant((output) => console.log(output))(requestObj)).resolves.toEqual(requestObj);
});
