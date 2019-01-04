module.exports = (res, body) => {
	res.headers = { ...res.headers, 'Content-Type': 'text/html' };
	res.body = `${body}`;
};
