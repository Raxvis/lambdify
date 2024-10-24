const get = require("./../get");

module.exports = (event) => get(event, "queryStringParameters", {});
