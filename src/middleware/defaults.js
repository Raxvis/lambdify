const catchError = require('./catchError');
const request = require('./request');
const payload = require('./payload');

module.exports = [catchError(), request(), payload()];
