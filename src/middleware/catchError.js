module.exports = (fn) => async (req, res, next) => {
	try {
		const output = await next(req, res);

		return output;
	} catch (error) {
		if (fn) {
			return fn(req, res, error);
		}

		return res.json({ errorMessage: error.message });
	}
};
