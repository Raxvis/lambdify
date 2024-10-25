const pathMatch = (req, action) => {
  try {
    if (
      action.method.toUpperCase() === 'ANY' ||
      action.method.toUpperCase() === req.getMethod()
    ) {
      const isMatch = action.pattern(req.getPath());

      if (isMatch) {
        const { params } = isMatch;

        // This sets the path params
        for (const key of params) {
          req.setPathParam(key, params[key]);
        }

        return true;
      }
    }
  } catch (error) {
    // Do nothing, action didn't match or it wasn't a path payload
  }

  return false;
};

module.exports = pathMatch;
