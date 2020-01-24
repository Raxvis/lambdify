/* eslint-disable max-params */
const UrlPattern = require('url-pattern');

const addPath = (actions, method, path, fn, ...middleware) => {
	actions.push({
		fn,
		method,
		middleware,
		path,
		pattern: new UrlPattern(path),
		type: 'path',
	});
};

module.exports = addPath;
