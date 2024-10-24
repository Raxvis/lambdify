/* eslint-disable max-statements */

// Event Sources: https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

const response = require("./../src/lib/response");

test("enableCors response", () => {
  const res = response();

  res.enableCors();

  expect(res.getResponse().headers["Access-Control-Allow-Credentials"]).toEqual(
    "true",
  );
  expect(res.getResponse().headers["Access-Control-Allow-Origin"]).toEqual("*");
});

test("set and get the body", () => {
  const res = response();

  res.setBody("test");

  expect(res.getBody()).toEqual("test");
});

test("set and get a header", () => {
  const res = response();

  res.setHeader("foo", "bar");

  expect(res.getHeader("foo")).toEqual("bar");
  expect(res.getHeaders()).toEqual({ foo: "bar" });
});

test("set and get headers", () => {
  const res = response();

  res.setHeaders({ foo: "bar" });

  expect(res.getHeader("foo")).toEqual("bar");
  expect(res.getHeaders()).toEqual({ foo: "bar" });
});

test("set and get the statusCode", () => {
  const res = response();

  res.setStatusCode(200);

  expect(res.getStatusCode()).toEqual(200);
});

test("set binaryResponse", () => {
  const res = response();

  res.setBinaryResponse(true);

  expect(res.getResponse()).toEqual({
    body: undefined,
    headers: {},
    isBase64Encoded: true,
    statusCode: 200,
  });
});
