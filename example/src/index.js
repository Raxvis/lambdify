const lambdify = require('lambdify/src');

const run = (request, response) => {
	response.html(`<h1>Hello World</h1>`);

	return response;
};

exports.handler = lambdify(run);
