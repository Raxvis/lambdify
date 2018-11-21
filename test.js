const lambdify = require('./src/index');
const { catchError, json } = require('./src/middleware');

const run = (request) => ({ foo: 'bar', hasContext: request.context.context });

const handler = lambdify([catchError(), json()], run);

const start = async () => {
	const event = { event: true };
	const context = { context: true };
	const response = await handler(event, context);

	console.log(response);
};

start();
