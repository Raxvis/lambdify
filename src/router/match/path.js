const pathMatch = (req, action) => {
	try {
		if (action.method.toUpperCase() === 'ANY' || action.method.toUpperCase() === req.getMethod()) {
			if (action.pattern.match(req.getPath())) {
				const params = action.pattern.match(req.getPath());

				// This sets the path params
				Object.keys(params).forEach((key) => req.setPathParam(key, params[key]));

				return true;
			}
		}
	} catch (error) {
		// Do nothing, action didn't match or it wasn't a path payload
	}

	return false;
};

module.exports = pathMatch;
