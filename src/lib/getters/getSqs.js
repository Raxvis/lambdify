const get = require("./../get");
const parseJson = require("./../parseJson");

module.exports = (event) =>
  get(event, "Records", []).map(({ body }) => parseJson(body));
