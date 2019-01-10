module.exports = (res, body, contentType) => {
	res.isBase64Encoded = true;
	res.headers = { ...res.headers, 'Content-Type': contentType };
	res.body = body;
};
