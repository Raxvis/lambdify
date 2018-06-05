/* global test, expect */

const runner = require('./../src');

const response = { test: 'this' };

test('payload loads object', () => {
	const output = runner.payload(response);

	expect(output.payload).toEqual(response);
});

test('test name in lambda response', () => {
	const output = runner.payload(response);

	expect(output.name).toEqual('no_name');
});

test('test name in lambda response with env', () => {
	process.env.name = 'process_env_name';
	const output = runner.payload(response);

	expect(output.name).toEqual(process.env.name);
});

test('test name in lambda response with env2', () => {
	process.env.AWS_LAMBDA_FUNCTION_NAME = 'process_env_aws_lambda_function_name';
	const output = runner.payload(response);

	expect(output.name).toEqual(process.env.AWS_LAMBDA_FUNCTION_NAME);
});

test('payload loads custom error object', () => {
	const output = runner.payload(response, {
		code: 'NOT_FOUND',
		logLevel: 'error',
		message: 'Failed to find resource',
		name: 'NotFoundError',
		statusCode: 404,
		type: 'NOT_FOUND',
	});

	expect(output.error.code).toEqual('NOT_FOUND');
});
