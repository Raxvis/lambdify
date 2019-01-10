const encode = require('./encode');

module.exports = (res, body) => {
	res.headers = { ...res.headers, 'Content-Type': 'application/json' };
	res.body = res.isBase64Encoded ? encode(JSON.stringify(body)) : JSON.stringify(body);
};
