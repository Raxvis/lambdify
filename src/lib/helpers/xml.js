const response = require("./response");

module.exports = (res, body) => response(res, body, "text/xml");
