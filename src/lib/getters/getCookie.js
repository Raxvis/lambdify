const getCookies = require("./getCookies");

module.exports = (event, name) => getCookies(event)[name];
