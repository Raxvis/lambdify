# lambdify

[![npm pack age](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/lambdify)

[![Version](https://badge.fury.io/js/lambdify.svg)](https://npmjs.org/package/lambdify) [![Build Status](https://travis-ci.org/Prefinem/lambdify.svg)](https://travis-ci.org/Prefinem/lambdify)

[![Maintainability](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/maintainability)](https://codeclimate.com/github/Prefinem/lambdify/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/test_coverage)](https://codeclimate.com/github/Prefinem/lambdify/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/lambdify.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/lambdify.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/lambdify.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/lambdify.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/lambdify.svg)

![Dependencies](https://david-dm.org/Prefinem/lambdify.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)

Lambdify is a set of tools that makes building and consuming AWS Lambda functions easier.

# NOTICE

**THESE ARE v4 DOCS. Please see [branch v3](https://github.com/Prefinem/lambdify/tree/v3) for v3 Docs**

**Master branch is v4. v4 drops lambdify-fn and lambdify-utils and is moving to a single package.**

If you used methods from lambdify-fn, you can use [afpf](https://github.com/Prefinem/afpf) instead

**_WARNING: Version >= 3.0.0 is for Node 8.10 or greater_**

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

-   `request.get(name)` - Get a value of `name` from a basic key value store
-   `request.getAuthToken()` - Get the authorization token from the request
-   `request.getBody()` - Get the body of the event and parse into an object if JSON
-   `request.getContext()` - Get the lambda context
-   `request.getCookie(name)` - Get value of cookie `name` from API Gateway Request
-   `request.getCookies()` - Get all cookies from API Gateway Request
-   `request.getEvent()` - Get lambda event
-   `request.getHeader(name)` - Get value of header `name` from API Gateway Request
-   `request.getHeaders()` - Get all headers from API Gateway Request
-   `request.getIp()` - Get remote ip (handles X-Forwarded-For)
-   `request.getMethod()` - Get HTTP request method from API Gateway Request
-   `request.getPath()` - Get URL path from API Gateway Request
-   `request.getPathParams()` - Get path paramaters from API Gateway Request
-   `request.getQueryParams()` - Get query parameter from API Gateway Request
-   `request.getS3()` - Get bucket and key from S3 Trigger
-   `request.getSns()` - Get record from SNS Trigger
-   `request.getSqs()` - Get records from SQS Trigger
-   `request.getUa()` - Get UserAgent from API Gateway Request
-   `request.set(name, value)` - Set a `value` of `name` into a basic key value store

## response

This is the response object that must be returned from your lambda function (or middleware)

Methods `binary`, `html`, `json`, `redirect`, `xml` can be returned directly

-   `response.binary(base64, contentType)`- Build a binary response
-   `response.enableCors()`- Enable CORS for an API Gateway response
-   `response.getBody()`- Get the body of the response
-   `response.getHeader(name)`- Get the value of header `name`
-   `response.getHeaders()`- Get all headers
-   `response.getResponse()`- Get the lambda response object
-   `response.getStatusCode()`- Get the status code of the response
-   `response.html(body)`- Build an html response
-   `response.json(body)`- Build a json response
-   `response.redirect(url, statusCode = 302)`- Build a redirect response
-   `response.setBinaryResponse(value)`- Set the response as a binary response for API Gateway
-   `response.setBody(body)`- Set the body of the response
-   `response.setHeader(name, value)`- Set `value` of header `name`
-   `response.setStatusCode(value)`- Set the status code of the response
-   `response.xml(body)`- Build an xml response

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

-   `event` is the event payload that your lambda accepts. See `event` below for event creation
-   `fn` is the function handler

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

-   `originalEvent` is the original event object you wish to extend
-   `body` is the new body payload being sent that is automatically `JSON.stringify`'ed
-   `overrides` is an object that will override anything else in the original event
