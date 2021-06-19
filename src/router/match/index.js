const sqs = require('./sqs');
const path = require('./path');

const match = (req, action) => {
  switch (action.type) {
    case 'sqs':
      return sqs(req, action);
    case 'path':
      return path(req, action);
    default:
      throw new Error(`Action type (${action.type}) not available`);
  }
};

module.exports = match;
