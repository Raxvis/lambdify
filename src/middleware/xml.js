const { response } = require('./../helpers');

const xml = (options) => async (req, res, next) => response(`${await next(req, res)}`, 'text/xml', options);

module.exports = xml;
