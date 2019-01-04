const payload = require('./../helpers');

module.exports = (fn) => async (req, res, next) => {
	try {
		const response = await next(req, res);
		const body = response.getBody();

		response.setBody(payload(body));

		return response;
	} catch (error) {
		if (fn) {
			return fn(req, res, error);
		}

		res.json(payload(undefined, error));

		return res;
	}
};
