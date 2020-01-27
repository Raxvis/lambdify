/* eslint-disable max-params */
const Route = require('route-parser');

const addPath = (actions, method, path, fn, ...middleware) => {
	actions.push({
		fn,
		method,
		middleware,
		path,
		pattern: new Route(path),
		type: 'path',
	});
};

module.exports = addPath;
