# lambdify-runner
[![version](https://badge.fury.io/js/lambdify-runner.svg)](http://badge.fury.io/js/lambdify-runner)
[![issues](https://img.shields.io/github/issues/Prefinem/lambdify-runner.svg)](https://github.com/Prefinem/lambdify-runner/issues)
[![dependencies](https://david-dm.org/Prefinem/lambdify-runner.svg)](https://david-dm.org/Prefinem/lambdify-runner)
[![devDependencies](https://david-dm.org/Prefinem/lambdify-runner/dev-status.svg)](https://david-dm.org/Prefinem/lambdify-runner#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/lambdify-runner.svg)](https://www.npmjs.com/package/lambdify-runner)

## Docs

Lambdify Runner is a simple, easy to use module that does a lot of the manual process of wrapping your api response for lambda proxy events and provides a nice standard request object to use inside your lambda function.


## Example

Use the standard JSON Payload:

	import { runner } from 'lambdify-runner';

	const run = (request) => {
		return {
			ipAddress: request.ip
		};
	};

	exports.handle = (event, context) => runner(event, context, run);

Use your own JSON Payload:

	import { json, runner } from 'lambdify-runner';

	const run = (request) => {
		return json({
			ipAddress: request.ip
		});
	};

	exports.handle = (event, context) => runner(event, context, run);

Return some HTML:

	import { html, runner } from 'lambdify-runner';

	const run = (request) => {
		return html(`<h1>Hello ${request.ip}</h1>`);
	};

	exports.handle = (event, context) => runner(event, context, run);

Return a binary object (if your API Gateway supports it):

	import fs from 'fs';
	import { binary, runner } from 'lambdify-runner';

	const run = (request) => {
		return binary(fs.readFileSync('image.png').toString('base64'), 'image/png'));
	};

	exports.handle = (event, context) => runner(event, context, run);

The Hard Way

	import fs from 'fs';
	import { response, runner } from 'lambdify-runner';

	const run = (request) => {
		return response(JSON.stringify({
			ip: request.ip
		}), 'application/json', {
			headers: {
				'Content-Size': '236347'
			},
			statusCode: 200
		});
	};

	exports.handle = (event, context) => runner(event, context, run);

## Response api

response(body, mime-type, options)

mime-type:
	default: application/json

options:

	{
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': '*',
			'Content-Type': type,
		},
		isBase64Encoded: false,
		statusCode: 200,
	}

## Request Object

	authToken: HTTP header x-amz-security-token
	body: event body JSON parsed
	context: lambda function context
	event: the original lambda event
	headers: all event headers
	ip: Remote IP
	method: HTTP Method
	pathParams: object of any path params passed in (always an object)
	queryParams: object of any query params passing in (always an object)
	sns: {
		message: If the event was triggered by SNS, this will be the SNS Message parsed as JSON
		subject: If the event was triggered by SNS, this will be the SNS Subject
	}

## Default JSON Payload

	{
		debug: error ? error.stack : '',
		message: error ? error.message : '',
		name: process.env.AWS_LAMBDA_FUNCTION_NAME,
		payload: body,
		status: error ? 'error' : 'success',
		timestamp: Math.floor(Date.now() / 1000),
	}