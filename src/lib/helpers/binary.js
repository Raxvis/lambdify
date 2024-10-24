const encode = require("./encode");

module.exports = (res, body, contentType) => {
  res.setBinaryResponse(true);
  res.setHeader("Content-Type", contentType);
  res.setBody(Buffer.isBuffer(body) ? encode(body) : body);
};
