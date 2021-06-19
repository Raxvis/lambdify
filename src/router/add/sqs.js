/* eslint-disable max-params */

// Either fn, [middleware]
// Or key, value, fn, [middleware]
const addSqs = (actions, key, value, fn, ...middleware) => {
  if (typeof key === 'function') {
    actions.push({ fn: key, middleware: [value, fn, ...middleware], options: {}, type: 'sqs' });
  } else {
    actions.push({
      fn,
      middleware,
      options: { key, value },
      type: 'sqs',
    });
  }
};

module.exports = addSqs;
