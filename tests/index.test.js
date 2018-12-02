const lambdify = require('./../src/index');
const context = {
	fail: () => {
		throw new Error('context fail');
	},
	success: () => 'success',
};
const event = {
	foo: 'baz',
};
const run = (request) => ({ foo: 'bar', hasContext: Boolean(request.context) });

test('initial run', async () => {
	const response = await lambdify(run)(event, context);

	expect(JSON.parse(response.body).payload.foo).toEqual('bar');
});

test('send event back', async () => {
	const response = await lambdify((request) => ({ ...request.event }))(event, context);

	expect(JSON.parse(response.body).payload.foo).toEqual('baz');
});
