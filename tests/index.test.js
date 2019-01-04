const lambdify = require('./../src/index');
const event = {
	foo: 'baz',
};
const run = (req, res) => {
	res.json({ foo: 'bar' });

	return res;
};

test('initial run', async () => {
	const response = await lambdify(run)(event);

	expect(JSON.parse(response.body).foo).toEqual('bar');
});

test('send event back', async () => {
	const response = await lambdify((req, res) => res.json({ ...req.getEvent() }))(event);

	expect(JSON.parse(response.body).foo).toEqual('baz');
});

test('get path params empty test', async () => {
	const response = await lambdify((req) => req.getPathParams())(event);

	expect(response).toEqual({});
});
