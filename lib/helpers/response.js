const encode = require('./encode');

module.exports = (res, body, contentType) => {
	res.setHeader('Content-Type', contentType);
	res.setBody(res.getResponse().isBase64Encoded ? encode(body) : body);
};
