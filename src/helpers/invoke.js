const context = (resolve, reject) => ({
  fail: (error) => reject(error),
  succeed: (response) => resolve(response),
});
const callback = (resolve, reject) => (error, success) =>
  error ? reject(error) : resolve(success);

const invoker = (event, fn) =>
  new Promise((resolve, reject) => {
    try {
      const response = fn(
        event,
        context(resolve, reject),
        callback(resolve, reject),
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

const invoke = async (event, handler) => {
  if (typeof handler !== "function") {
    throw new Error("No valid handler passed to invoke");
  }

  const response = await invoker(event, handler);

  return Promise.resolve(response);
};

module.exports = invoke;
