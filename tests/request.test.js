/* eslint-disable max-statements */

// Event Sources: https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

const request = require("./../src/lib/request");

test("handle apiGatewayProxyEvent", () => {
  const context = { foo: "bar" };
  const apiGatewayProxyEvent = require("./events/apiGatewayProxy.json");
  const req = request(apiGatewayProxyEvent, context);

  expect(req.getAuthToken()).toEqual("");
  expect(req.getBody()).toEqual({ foo: "bar" });
  expect(req.getContext()).toEqual({ foo: "bar" });
  expect(req.getCookie("test")).toEqual("this");
  expect(req.getCookies()).toEqual({ test: "this" });
  expect(req.getEvent()).toEqual(apiGatewayProxyEvent);
  expect(req.getHeader("Cookie")).toEqual("test=this");
  expect(req.getHeader("Cookie")).toEqual(apiGatewayProxyEvent.headers.Cookie);
  expect(req.getHeaders()).toEqual(apiGatewayProxyEvent.headers);
  expect(req.getIp()).toEqual("50.129.117.14");
  expect(req.getIp()).toEqual(
    apiGatewayProxyEvent.requestContext.identity.sourceIp,
  );
  expect(req.getMethod()).toEqual("POST");
  expect(req.getMethod()).toEqual(
    apiGatewayProxyEvent.requestContext.httpMethod,
  );
  expect(req.getPath()).toEqual("/");
  expect(req.getPath()).toEqual(apiGatewayProxyEvent.path);
  expect(req.getPathParam("email")).toEqual(
    apiGatewayProxyEvent.pathParameters.email,
  );
  expect(req.getPathParam("email")).toEqual("me@example.com");
  expect(req.getPathParams()).toEqual(apiGatewayProxyEvent.pathParameters);
  expect(req.getPathParams()).toEqual({ email: "me@example.com" });
  expect(req.getQueryParam("version")).toEqual(
    apiGatewayProxyEvent.queryStringParameters.version,
  );
  expect(req.getQueryParam("version")).toEqual("1.0.0");
  expect(req.getQueryParams()).toEqual(
    apiGatewayProxyEvent.queryStringParameters,
  );
  expect(req.getQueryParams()).toEqual({ version: "1.0.0" });
  expect(req.getUa()).toEqual(
    apiGatewayProxyEvent.requestContext.identity.userAgent,
  );
  expect(req.getUa()).toEqual(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
  );
});

test("handle albEvent", () => {
  const context = { foo: "bar" };
  const albEvent = require("./events/alb.json");
  const req = request(albEvent, context);

  expect(req.getAuthToken()).toEqual("");
  expect(req.getBody()).toEqual({ foo: "bar" });
  expect(req.getContext()).toEqual({ foo: "bar" });
  expect(req.getCookie("test")).toEqual("this");
  expect(req.getCookies()).toEqual({ test: "this" });
  expect(req.getEvent()).toEqual(albEvent);
  expect(req.getHeader("cookie")).toEqual("test=this");
  expect(req.getHeader("cookie")).toEqual(albEvent.headers.cookie);
  expect(req.getHeaders()).toEqual(albEvent.headers);
  expect(req.getIp()).toEqual("50.129.117.14");
  expect(req.getMethod()).toEqual("GET");
  expect(req.getMethod()).toEqual(albEvent.httpMethod);
  expect(req.getPath()).toEqual("/");
  expect(req.getPath()).toEqual(albEvent.path);
  expect(req.getQueryParam("version")).toEqual(
    albEvent.queryStringParameters.version,
  );
  expect(req.getQueryParam("version")).toEqual("1.0.0");
  expect(req.getQueryParams()).toEqual(albEvent.queryStringParameters);
  expect(req.getQueryParams()).toEqual({ version: "1.0.0" });
  expect(req.getUa()).toEqual(albEvent.headers["user-agent"]);
  expect(req.getUa()).toEqual(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
  );
});

test("handle s3Event", () => {
  const context = { foo: "bar" };
  const s3Event = require("./events/s3.json");
  const req = request(s3Event, context);

  expect(req.getS3()).toEqual({ bucket: "sourcebucket", key: "HappyFace.jpg" });
});

test("handle snsEvent", () => {
  const context = { foo: "bar" };
  const snsEvent = require("./events/sns.json");
  const req = request(snsEvent, context);

  expect(req.getSns()).toEqual({
    message: "Hello from SNS!",
    subject: "TestInvoke",
  });
});

test("handle sqsEvent", () => {
  const context = { foo: "bar" };
  const sqsEvent = require("./events/sqs.json");
  const req = request(sqsEvent, context);

  expect(req.getSqs()).toEqual([{ foo: "bar" }]);
});

test("set / get work correctly", () => {
  const req = request({}, {});

  req.set("foo", "bar");
  req.set("obj", { foo: "bar" });
  req.set("arr", [{ foo: "bar" }]);

  expect(req.get("foo")).toEqual("bar");
  expect(req.get("obj")).toEqual({ foo: "bar" });
  expect(req.get("arr")).toEqual([{ foo: "bar" }]);
});

test("handle alb event", () => {
  const req = request(
    {
      body: Buffer.from(JSON.stringify({ foo: "bar" })).toString("base64"),
      headers: {
        host: "host.example.com",
        "x-forwarded-for": "ip_address",
        "x-forwarded-port": "443",
        "x-forwarded-proto": "https",
      },
      httpMethod: "GET",
      isBase64Encoded: true,
      path: "/",
      queryStringParameters: {},
      requestContext: {
        elb: { targetGroupArn: "arn:aws:elasticloadbalancing:*" },
      },
    },
    {},
  );

  expect(req.getBody()).toEqual({ foo: "bar" });
});
