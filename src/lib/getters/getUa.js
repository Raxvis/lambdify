const get = require("./../get");

module.exports = (event) => {
  const userAgent = get(event, "requestContext.identity.userAgent", "");

  if (userAgent) {
    return userAgent;
  }

  return get(event, "headers.user-agent", "");
};
