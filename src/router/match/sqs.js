const get = require('./../../lib/get');

const sqsMatch = (req, action) => {
  try {
    const [message] = req.getSqs();

    if (!message) {
      return false;
    } else if (!action.options || !action.options.key) {
      return true;
    } else if (get(message, action.options.key) === action.options.value) {
      return true;
    }
  } catch (error) {
    // Do nothing, action didn't match or it wasn't an SQS message
  }

  return false;
};

module.exports = sqsMatch;
