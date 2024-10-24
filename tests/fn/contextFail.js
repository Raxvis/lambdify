exports.handler = (event, context) => {
  context.fail(new Error("failed"));
};
