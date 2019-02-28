const lambdify = require('./../src/index');
const request = require('./../src/lib/request');
const response = require('./../src/lib/response');

const event = { foo: 'baz' };

test('fail to change request', async () => {
	const run = (req) => {
		req.foo = 'bar';

		return req;
	};
	const req = await lambdify(run)(event);

	expect(req.foo).toEqual(undefined);
});

test('fail to change response', async () => {
	const run = (req, res) => {
		res.foo = 'bar';

		return res;
	};
	const res = await lambdify(run)(event);

	expect(res.foo).toEqual(undefined);
});

test('request isFrozen', () => {
	const req = request(event, {});

	expect(Object.isFrozen(req)).toEqual(true);
});

test('response isFrozen', () => {
	const res = response();

	expect(Object.isFrozen(res)).toEqual(true);
});
