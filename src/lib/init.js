module.exports = async (req, res, next) => {
  const response = await next(req, res);

  return response && response.getResponse ? response.getResponse() : response;
};
