const encode = require('./encode');

module.exports = (res, body) => {
	res.setHeader('Content-Type', 'application/json');
	res.setBody(res.getResponse().isBase64Encoded ? encode(JSON.stringify(body)) : JSON.stringify(body));
};
