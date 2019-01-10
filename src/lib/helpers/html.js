const encode = require('./encode');

module.exports = (res, body) => {
	res.headers = { ...res.headers, 'Content-Type': 'text/html' };
	res.body = res.isBase64Encoded ? encode(body) : body;
};
