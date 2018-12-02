const { response } = require('./../helpers');

const html = (options) => async (req, res, next) => response(`${await next(req, res)}`, 'text/html', options);

module.exports = html;
