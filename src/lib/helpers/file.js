const binary = require('./binary');
const fs = require('fs');

module.exports = (res, filePath, contentType) => binary(res, fs.readFileSync(filePath), contentType);
