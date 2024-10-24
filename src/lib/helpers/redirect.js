module.exports = (res, url, statusCode = 302) => {
  res.setHeader("Location", url);
  res.setStatusCode(statusCode);
};
