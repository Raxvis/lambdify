module.exports = (res, body) => {
	res.headers = { ...res.headers, 'Content-Type': 'text/xml' };
	res.body = `${body}`;
};
