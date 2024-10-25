const binary = require('./binary');
const fs = require('node:fs');

module.exports = (res, filePath, contentType) =>
  binary(res, fs.readFileSync(filePath), contentType);
