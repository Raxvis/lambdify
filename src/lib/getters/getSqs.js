const get = require('lodash.get');
const parseJson = require('./../parseJson');

module.exports = (event) => get(event, 'Records', []).map(({ body }) => parseJson(body));
