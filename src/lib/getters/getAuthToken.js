const get = require("./../get");

module.exports = (event) =>
  get(event, "headers.x-amz-security-token") ||
  get(event, "headers.X-Amz-Security-Token") ||
  get(event, "headers.authorization") ||
  get(event, "headers.Authorization") ||
  "";
