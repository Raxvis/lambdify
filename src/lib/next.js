const next =
  (fn, ...rest) =>
  (req, res) =>
    fn ? fn(req, res, next(...rest)) : res;

module.exports = next;
