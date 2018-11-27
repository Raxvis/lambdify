const defaults = require('./middleware/defaults');
const next = ([fn, ...rest]) => (request, response) => (fn ? fn(request, response, next(rest)) : response);

module.exports = (fn, middleware = defaults) => (event, context) => next([...middleware, fn])({ context, event });
