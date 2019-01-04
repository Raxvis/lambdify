module.exports = (res, body) => {
	res.headers = { ...res.headers, 'Content-Type': 'application/json' };
	res.body = JSON.stringify(body);
};
