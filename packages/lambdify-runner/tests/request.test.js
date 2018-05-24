/* global test, expect */

const runner = require('./../src');
const response = { test: 'this' };

test('request loads event', () => {
	const req = runner.request(response);

	expect(req.event).toEqual(response);
});

test('request handles bad json', () => {
	const req = runner.request({ body: 'test' });

	expect(req.body).toEqual('test');
});