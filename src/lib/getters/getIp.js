const get = require("./../get");

module.exports = (event) => {
  const ip =
    get(event, "headers.X-Forwarded-For") ||
    get(event, "headers.x-forwarded-for") ||
    get(event, "requestContext.identity.sourceIp", "");

  return ip.split(",")[0];
};
