const get = require("./../get");
const parseJson = require("./../parseJson");

module.exports = (event) => ({
  message: parseJson(get(event, "Records.0.Sns.Message", "{}")),
  subject: get(event, "Records.0.Sns.Subject", ""),
});
