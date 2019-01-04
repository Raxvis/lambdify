module.exports = (res, url, statusCode = 302) => {
	res.headers = { ...res.headers, Location: url };
	res.statusCode = statusCode;
};
