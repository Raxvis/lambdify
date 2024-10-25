const response = require('./../src/lib/response');

test('redirect response', () => {
  const res = response();

  res.redirect('https://example.com');

  expect(res.getResponse()).toEqual({
    body: undefined,
    headers: { Location: 'https://example.com' },
    isBase64Encoded: false,
    statusCode: 302,
  });
});

test('redirect response with statusCode', () => {
  const res = response();

  res.redirect('https://example.com', 301);

  expect(res.getResponse()).toEqual({
    body: undefined,
    headers: { Location: 'https://example.com' },
    isBase64Encoded: false,
    statusCode: 301,
  });
});
