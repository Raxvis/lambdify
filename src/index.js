const { catchError, payload, request } = require('./middleware');

let currentMiddleware = [catchError(), request(), payload()];

const next = ([fn, ...rest]) => (request, response) => (fn ? fn(request, response, next(rest)) : response);
const run = (fn) => (event, context) => next([...currentMiddleware, fn])({ context, event }, {});

const lambdify = (middleware, fn) => {
	if (Array.isArray(middleware)) {
		currentMiddleware = middleware;
		if (fn) {
			return run(fn);
		}
	} else if (!Array.isArray(middleware) && middleware) {
		return run(middleware);
	}

	return middleware;
};

module.exports = lambdify;
