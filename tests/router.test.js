const lambdify = require('./../src/index');
const createRouter = require('./../src/router/index');

it('router 404', async () => {
  const router = createRouter();

  const handler = lambdify(router.serve);
  const res = await handler({}, {});

  await expect(res.statusCode).toEqual(404);
});

it('router simple path', async () => {
  const router = createRouter();

  router.path('any', '/', (req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler({ path: '/' }, {});

  await expect(res.statusCode).toEqual(200);
});

it('router simple path with specific method', async () => {
  const router = createRouter();

  router.path('get', '/', (req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler(
    { path: '/', requestContext: { httpMethod: 'get' } },
    {},
  );

  await expect(res.statusCode).toEqual(200);
});

it('router get id from path', async () => {
  const router = createRouter();

  router.path('any', '/:id', (req, res) =>
    res.json({ id: req.getPathParam('id'), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler({ path: '/1' }, {});

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).id).toEqual('1');
});

it('router override pathParameters', async () => {
  const router = createRouter();

  router.path('any', '/:id', (req, res) =>
    res.json({ id: req.getPathParam('id'), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler({ path: '/1', pathParameters: { id: 2 } }, {});

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).id).toEqual('1');
});

it('router handle file extensions', async () => {
  const router = createRouter();

  router.path('any', '/:id', (req, res) =>
    res.json({ id: req.getPathParam('id'), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler({ path: '/1.png', pathParameters: { id: 2 } }, {});

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).id).toEqual('1.png');
});

it('router multiple matches with optional', async () => {
  const router = createRouter();

  router.path('any', '/:firstName/:lastName?', (req, res) =>
    res.json({ ...req.getPathParams(), status: 'success' }),
  );
  router.path('any', '/:firstName{/:lastName}', (req, res) =>
    res.json({ ...req.getPathParams(), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler({ path: '/John', pathParameters: { id: 2 } }, {});

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).firstName).toEqual('John');
  await expect(JSON.parse(res.body).lastName).toEqual(undefined);
});

it('router multiple matches with optional matchings', async () => {
  const router = createRouter();

  router.path('any', '/:firstName{/:lastName}', (req, res) =>
    res.json({ ...req.getPathParams(), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler(
    { path: '/John/Smith', pathParameters: { id: 2 } },
    {},
  );

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).firstName).toEqual('John');
  await expect(JSON.parse(res.body).lastName).toEqual('Smith');
});

it('router multiple matches', async () => {
  const router = createRouter();

  router.path('any', '/:firstName/:lastName', (req, res) =>
    res.json({ ...req.getPathParams(), status: 'success' }),
  );

  const handler = lambdify(router.serve);
  const res = await handler(
    { path: '/John/Smith', pathParameters: { id: 2 } },
    {},
  );

  await expect(res.statusCode).toEqual(200);
  await expect(JSON.parse(res.body).firstName).toEqual('John');
  await expect(JSON.parse(res.body).lastName).toEqual('Smith');
});

it('router match sqs', async () => {
  const router = createRouter();

  router.sqs('event', 'foo', (req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler(
    { Records: [{ body: JSON.stringify({ event: 'foo' }) }] },
    {},
  );

  await expect(res.statusCode).toEqual(200);
});

it('router failed match sqs', async () => {
  const router = createRouter();

  router.sqs('event', 'foo', (req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler(
    { Records: [{ body: JSON.stringify({ event: 'foz' }) }] },
    {},
  );

  await expect(res.statusCode).toEqual(404);
});

// This has to go after the match cases otherwise it will always hit
it('router simple sqs', async () => {
  const router = createRouter();

  router.sqs((req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler({ Records: [{ body: JSON.stringify({}) }] }, {});

  await expect(res.statusCode).toEqual(200);
});

it('setup notfound', async () => {
  const router = createRouter();

  router.notFound((req, res) => res.json({ status: 'success' }));

  const handler = lambdify(router.serve);
  const res = await handler({}, {});

  await expect(res.statusCode).toEqual(200);
});
