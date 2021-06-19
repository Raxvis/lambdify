module.exports = (res, body, contentType) => {
  res.setBinaryResponse(true);
  res.setHeader('Content-Type', contentType);
  res.setBody(body);
};
