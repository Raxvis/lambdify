const lambdaServer = require('./../src/server');
const express = require('express');

const event = {
	body: '',
	headers: {
		accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'accept-encoding': 'gzip',
		'accept-language': 'en-US,en;q=0.5',
		connection: 'keep-alive',
		cookie: 'name=value',
		host: 'lambda-YYYYYYYY.elb.amazonaws.com',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:60.0) Gecko/20100101 Firefox/60.0',
		'x-amzn-trace-id': 'Root=1-5bdb40ca-556d8b0c50dc66f0511bf520',
		'x-forwarded-for': '192.0.2.1',
		'x-forwarded-port': '80',
		'x-forwarded-proto': 'http',
	},
	httpMethod: 'GET',
	isBase64Encoded: false,
	path: '/',
	queryStringParameters: {},
	requestContext: {
		elb: {
			targetGroupArn: 'arn:aws:elasticloadbalancing:us-east-1:XXXXXXXXXXX:targetgroup/sample/6d0ecf831eec9f09',
		},
	},
};

test('basic test', async () => {
	const app = express();

	app.get('/', (req, res) => res.send('Hello World!'));

	const response = await lambdaServer(app, true)(event);

	await expect(response.body).toEqual('SGVsbG8gV29ybGQh');
	await expect(response.isBase64Encoded).toEqual(true);
	await expect(response.statusCode).toEqual(200);
	await expect(response.headers['content-length']).toEqual('12');
	await expect(response.headers['content-type']).toEqual('text/html; charset=utf-8');
});
