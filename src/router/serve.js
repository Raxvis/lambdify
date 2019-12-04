const match = require('./match');
const next = require('./../lib/next');

const serveRequest = (req, res, { actions, notFoundFn }) => {
	const matchingAction = actions.find((action) => match(req, action));

	if (matchingAction) {
		return next(...matchingAction.middleware, matchingAction.fn)(req, res);
	}
	return notFoundFn(req, res);
};

module.exports = serveRequest;
