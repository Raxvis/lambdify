const lambdify = require('./../index');
const router = require('./../router/index')();

it('router 404', async () => {
	const handler = lambdify(router.serve);
	const res = await handler({}, {});

	await expect(res.statusCode).toEqual(404);
});

it('router simple path', async () => {
	router.path('any', '/', (req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ path: '/' }, {});

	await expect(res.statusCode).toEqual(200);
});

it('router simple path with specific method', async () => {
	router.path('get', '/', (req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ path: '/', requestContext: { httpMethod: 'get' } }, {});

	await expect(res.statusCode).toEqual(200);
});

it('router get id from path', async () => {
	router.path('any', '/:id', (req, res) => res.json({ id: req.getPathParam('id'), status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ path: '/1' }, {});

	await expect(res.statusCode).toEqual(200);
	await expect(JSON.parse(res.body).id).toEqual('1');
});

it('router override pathParameters', async () => {
	router.path('any', '/:id', (req, res) => res.json({ id: req.getPathParam('id'), status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ path: '/1', pathParameters: { id: 2 } }, {});

	await expect(res.statusCode).toEqual(200);
	await expect(JSON.parse(res.body).id).toEqual('1');
});

it('router match sqs', async () => {
	router.sqs('event', 'foo', (req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ Records: [{ body: JSON.stringify({ event: 'foo' }) }] }, {});

	await expect(res.statusCode).toEqual(200);
});

it('router failed match sqs', async () => {
	router.sqs('event', 'foo', (req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ Records: [{ body: JSON.stringify({ event: 'foz' }) }] }, {});

	await expect(res.statusCode).toEqual(404);
});

// This has to go after the match cases otherwise it will always hit
it('router simple sqs', async () => {
	router.sqs((req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({ Records: [{ body: JSON.stringify({}) }] }, {});

	await expect(res.statusCode).toEqual(200);
});

it('setup notfound', async () => {
	router.notFound((req, res) => res.json({ status: 'success' }));

	const handler = lambdify(router.serve);
	const res = await handler({}, {});

	await expect(res.statusCode).toEqual(200);
});
