const lambdify = require('./../src/index');

test('parse json from body', async () => {
  const event = { body: '{"foo": "bar"}' };
  const run = (req, res) => res.json({ body: req.getBody() });
  const response = await lambdify(run)(event);

  expect(JSON.parse(response.body).body.foo).toEqual('bar');
});

test('handle bad json gracefully', async () => {
  const event = { body: '{""foo": "bar"}' };
  const run = (req, res) => res.json({ body: req.getBody() });
  const response = await lambdify(run)(event);

  expect(JSON.parse(response.body).body).toEqual('{""foo": "bar"}');
});
