module.exports = async (req, res, next) => {
	const response = await next(req, res);

	return response.getResponse ? response.getResponse() : response;
};
