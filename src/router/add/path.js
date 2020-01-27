/* eslint-disable max-params */
const { match } = require('path-to-regexp');

const addPath = (actions, method, path, fn, ...middleware) => {
	actions.push({
		fn,
		method,
		middleware,
		path,
		pattern: match(path),
		type: 'path',
	});
};

module.exports = addPath;
