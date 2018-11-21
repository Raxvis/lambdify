const { payload, response } = require('./../helpers');

const catchError = (fn) => async (req, res, next) => {
	try {
		const output = await next(req, res);

		return output;
	} catch (error) {
		if (fn) {
			return fn(req, res, error);
		}

		return response(payload({}, error));
	}
};

module.exports = catchError;
