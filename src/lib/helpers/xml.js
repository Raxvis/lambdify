const encode = require('./encode');

module.exports = (res, body) => {
	res.setHeader('Content-Type', 'text/xml');
	res.setBody(res.getResponse().isBase64Encoded ? encode(body) : body);
};
