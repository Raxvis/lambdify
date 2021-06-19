const request = require('./../src/lib/request');

test('getIp requestContext sourceIp', () => {
  const event = { requestContext: { identity: { sourceIp: '50.129.117.14' } } };
  const req = request(event);

  expect(req.getIp()).toEqual('50.129.117.14');
});

test('getIp X-Forwarded-For', () => {
  const event = { headers: { 'X-Forwarded-For': '50.129.117.14' } };
  const req = request(event);

  expect(req.getIp()).toEqual('50.129.117.14');
});

test('getIp lower case x-forwarded-for', () => {
  const event = { headers: { 'x-forwarded-for': '50.129.117.14' } };
  const req = request(event);

  expect(req.getIp()).toEqual('50.129.117.14');
});

test('getIp with multiple ips', () => {
  const event = { headers: { 'X-Forwarded-For': '50.129.117.14, 50.112.234.94' } };
  const req = request(event);

  expect(req.getIp()).toEqual('50.129.117.14');
});
