# lambdify

[![Version](https://img.shields.io/npm/v/lambdify?style=for-the-badge)](https://npmjs.org/package/lambdify)

[![Build Status](https://img.shields.io/github/workflow/status/Raxvis/lambdify/ci?style=for-the-badge)](https://github.com/Raxvis/lambdify/actions) [![Maintainability](https://img.shields.io/codeclimate/coverage-letter/Raxvis/lambdify?style=for-the-badge)](https://codeclimate.com/github/Raxvis/lambdify/maintainability) [![Test Coverage](https://img.shields.io/codecov/c/github/Raxvis/lambdify?style=for-the-badge)](https://codecov.io/gh/Raxvis/lambdify)

![Monthly Downloads](https://img.shields.io/npm/dm/lambdify?style=for-the-badge)

![Issues](https://img.shields.io/github/issues/Raxvis/lambdify?style=for-the-badge) ![Pull Requests](https://img.shields.io/github/issues-pr/Raxvis/lambdify?style=for-the-badge)

![Dependencies](https://img.shields.io/david/Raxvis/lambdify?style=for-the-badge) ![Dev Dependencies](https://img.shields.io/david/dev/Raxvis/lambdify?style=for-the-badge)

Lambdify is a set of tools that makes building and consuming AWS Lambda functions easier.


# Getting Started

Basic HTTP Lambda Function - JSON Response

```js
const lambdify = require('lambdify');

const helloWorld = (request, response) => {
  response.json({ message: `Hello User, I see that you are coming from IP: ${request.getIp()}` });

  return response;
};

exports.handler = lambdify(helloWorld);
```

Basic HTTP Lambda Function - HTML Response

```js
const lambdify = require('lambdify');

const helloWorld = (request, response) => {
  response.html(`Hello User, I see that you are coming from IP: ${request.getIp()}`);

  return response;
};

exports.handler = lambdify(helloWorld);
```

Basic S3 Trigger

```js
const lambdify = require('lambdify');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const run = async (request) => {
  const { bucket, key } = request.getS3();
  const file = await s3.getObject({ Bucket: bucket, Key: key }).promise();

  if (file && file.Body) {
    // Do something with the file
  }
};

exports.handler = lambdify(run);
```

# Installation

    npm i lambdify

or

    yarn add lambdify

# `lambdify(fn, middleware = [])`

Lambdify accepts a function and an array of middleware

```js
const lambdify = require('lambdify');
const errorMiddleware = require('errorMiddleware');

const run = (request, response) => {
  response.json({ foo: 'bar' });

  return response;
};

exports.handler = lamdify(run, [errorMiddleware]);
```

## request

This is the request object that is built from the lambda event

- `request.get(name)` - Get a value of `name` from a basic key value store
- `request.getAuthToken()` - Get the authorization token from the request
- `request.getBody()` - Get the body of the event and parse into an object if JSON
- `request.getContext()` - Get the lambda context
- `request.getCookie(name)` - Get value of cookie `name` from API Gateway Request
- `request.getCookies()` - Get all cookies from API Gateway Request
- `request.getEvent()` - Get lambda event
- `request.getHeader(name)` - Get value of header `name` from API Gateway Request
- `request.getHeaders()` - Get all headers from API Gateway Request
- `request.getIp()` - Get remote ip (handles X-Forwarded-For)
- `request.getMethod()` - Get HTTP request method from API Gateway Request
- `request.getPath()` - Get URL path from API Gateway Request
- `request.getPathParams()` - Get path paramaters from API Gateway Request
- `request.getQueryParam(name)` - Get value of query parameter `name` from API Gateway Request
- `request.getQueryParams()` - Get query parameters from API Gateway Request
- `request.getS3()` - Get bucket and key from S3 Trigger
- `request.getSns()` - Get record from SNS Trigger
- `request.getSqs()` - Get records from SQS Trigger
- `request.getUa()` - Get UserAgent from API Gateway Request
- `request.set(name, value)` - Set a `value` of `name` into a basic key value store

## response

This is the response object that must be returned from your lambda function (or middleware)

Methods `binary`, `html`, `json`, `redirect`, `xml` can be returned directly

- `response.binary(base64 | buffer, contentType)`- Build a binary response
- `response.enableCors()`- Enable CORS for an API Gateway response
- `response.getBody()`- Get the body of the response
- `response.getHeader(name)`- Get the value of header `name`
- `response.getHeaders()`- Get all headers
- `response.getResponse()`- Get the lambda response object
- `response.getStatusCode()`- Get the status code of the response
- `response.html(body)`- Build an html response
- `response.json(body)`- Build a json response
- `response.file(filePath, contentType)`- Sends file
- `response.redirect(url, statusCode = 302)`- Build a redirect response
- `response.setBinaryResponse(value)`- Set the response as a binary response for API Gateway
- `response.setBody(body)`- Set the body of the response
- `response.setHeader(name, value)`- Set `value` of header `name`
- `response.setStatusCode(value)`- Set the status code of the response
- `response.xml(body)`- Build an xml response

# Middleware

Middleware allows you to wrap your function with another function in such a way that you can execute code before or after your function runs. This is useful for instantiating database connections or error handling

### Example: simple middleware

```js
const middleware = async (req, res, next) => {
  const response = await next(req, res);

  response.setHeader('Cookie', 'test=this');

  return response;
};

module.exports = middleware;
```

Usage:

```js
const lambdify = require('lambdify');
const middleware = require('./middleware');

const run = (request, response) => {
  response.json({ foo: 'bar' });

  return response;
};

exports.handler = lamdify(run, [middleware]);
```

### Example: error middleware

```js
const errorMiddleware = async (req, res, next) => {
  try {
    const response = await next(req, res);

    return response;
  } catch (error) {
    // Fire off log to error system like raygun / sentry

    res.setStatusCode(500);

    return res.json({
      message: error.message,
      stack: error.stack,
      status: 'error',
    });
  }
};

module.exports = errorMiddleware;
```

Usage:

```js
const lambdify = require('lambdify');
const errorMiddleware = require('./errorMiddleware');

const run = (request, response) => {
  response.json({ foo: 'bar' });

  return response;
};

exports.handler = lamdify(run, [errorMiddleware]);
```

### Example: knex middleware

```js
const knex = (config) => async (req, res, next) => {
  const knex = require('knex')(config);

  req.set('knex', knex);

  try {
    const response = await next(req, res);

    await knex.destroy();

    return response;
  } catch (error) {
    await knex.destroy();

    throw error;
  }
};

module.exports = knex;
```

Usage:

```js
const lambdify = require('lambdify');
const knexMiddleware = require('./knexMiddleware');

const run = (request, response) => {
  const knex = request.get('knex');
  const user = knex('user').where({ id: request.getPathParam('userId') });

  response.json({ user });

  return response;
};

exports.handler = lamdify(run, [knexMiddleware(dbConfig)]);
```

# Router

Lambdify provides a router to enable your to attach a lambda to an ALB endpoint or a proxy+ api gateway path

## Example

```js
const lambdify = require('lambdify');
const router = require('lambdify/router')(); # Mind the double parentheses here

const index = (req, res) => res.json({ foo: 'bar' });

router.path('get', '/', index);

exports.handlers = lambdify(router.serve);
```

## `router.path(httpMethod, path, fn, ...middleware)`

This will match the method and path. The path can be a valid url path defined [here](https://www.npmjs.com/package/url-pattern)

## `router.sqs(key/fn, [value, fn], ...middleware)`

If key, value, fn are provided, it will match on the matching key / value inside the sqs request payload (single SQS message only). If just fn is provided, it will execute the fn when there is an SQS event

## `router.serve`

This is the fn that lambdify accepts

# Helpers

Lambdify provides a couple of helpers to help consume other local lambda functions and build / extend events.

## `invoke(event, fn)`

Invoke is used to invoke other local lambda code correctly irregardless if the function uses callback, context or a standard response.

- `event` is the event payload that your lambda accepts. See `event` below for event creation
- `fn` is the function handler

Example

```js

const lambdify = require('lambdify');
const { event, invoke } = require('lambdify/helpers');

const run = (req, res) => {
  const newEvent = event(req.getEvent(), { foo: 'bar' });
  const fn = require('./otherProjectLambdaFunction/turnBarToBaz').handler;
  const response = await invoke(newEvent, fn);

  return res.json((JSON.parse(response.body));
  // => { foo: 'baz' }
};

exports.handler = lambdify(run);
```

## `event(originalEvent = {}, body = {}, overrides = {})`

The goal of event is to ensure a consistent event payload to be sent to other lambda functions in a clean and consistent structure

- `originalEvent` is the original event object you wish to extend
- `body` is the new body payload being sent that is automatically `JSON.stringify`'ed
- `overrides` is an object that will override anything else in the original event

# Lambda Web Server / Express

Run a webserver on your lambda instance! Express, Koa, etc should now run without a hitch.

This is very similar to [aws-serverless-express](https://github.com/awslabs/aws-serverless-express). The main point being, it's a little more clean and simple to understand

## Example

Your Lambda Handler (usually `index.js`)

```js
const lambdaServer = require('lambdify/server');
const app = require('./app');

exports.handler = lambdaServer(app);
```

`app.js`

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

module.export = app;
```

And for testing locally (I like to name it `server.js`)

```js
const app = require('./app.js');

app.listen(3000, () => console.log('Now Listening'));
```

## Why not use `aws-serverless-express`

This focuses on simplicity and standard use cases. It also doesn't worry about legacy implementations of lambda callback / context use and is focused on Node 10 / 12 support only with an emphasis on async / await code

## Other inspiration

This was originally developed to handle next.js SSR on AWS Lambda. Officially there is no support and although packages like [serverless-nextjs-plugin](https://www.npmjs.com/package/serverless-nextjs-plugin) exist, they require more packages and the serverless deployment system.
