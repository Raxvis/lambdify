const response = require('./../src/lib/response');
const encode = require('./../src/lib/helpers/encode');

const svg = `<?xml version="1.0"><svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="1" height="1" fill="black" /></svg>`;

test('binary response', () => {
  const res = response();

  res.binary(encode(svg), 'image/svg+xml');

  expect(res.getResponse()).toEqual({
    body: Buffer.from(svg).toString('base64'),
    headers: { 'Content-Type': 'image/svg+xml' },
    isBase64Encoded: true,
    statusCode: 200,
  });
});

test('binary response convert buffer automatically', () => {
  const res = response();
  const buf = Buffer.from(svg);

  res.binary(buf, 'image/svg+xml');

  expect(res.getResponse()).toEqual({
    body: Buffer.from(svg).toString('base64'),
    headers: { 'Content-Type': 'image/svg+xml' },
    isBase64Encoded: true,
    statusCode: 200,
  });
});
