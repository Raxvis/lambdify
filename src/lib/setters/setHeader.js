module.exports = (res, name, value) => {
  res.headers[name] = value;
};
