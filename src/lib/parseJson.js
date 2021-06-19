module.exports = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return json;
  }
};
