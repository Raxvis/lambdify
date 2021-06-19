const addPath = require('./add/path');
const addSqs = require('./add/sqs');
const defaultNotFound = require('./defaultNotFound');
const serve = require('./serve');

const router = () => {
  const actions = [];
  let notFoundFn = defaultNotFound;

  return {
    notFound: (fn) => {
      notFoundFn = fn;
    },
    path: (...params) => addPath(actions, ...params),
    serve: (req, res) => serve(req, res, { actions, notFoundFn }),
    sqs: (...params) => addSqs(actions, ...params),
  };
};

module.exports = router;
