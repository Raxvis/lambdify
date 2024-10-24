const binarycase = require("binary-case");

const handleHeaders = (originalHeaders, bodyBuffer) => {
  // HACK: modifies header casing to get around API Gateway's limitation of not allowing multiple
  // headers with the same name, as discussed on the AWS Forum https://forums.aws.amazon.com/message.jspa?messageID=725953#725953
  // biome-ignore lint/performance/noDelete: This should not exist and should be removed.  Undefined might keep the key on the object and thus fail
  delete originalHeaders.connection;

  return {
    "content-length": String(bodyBuffer.length),
    ...Object.keys(originalHeaders).reduce((result, header) => {
      const value = originalHeaders[header];

      if (header.toLowerCase() === "set-cookie" && Array.isArray(value)) {
        value.forEach((cookie, index) => {
          result[binarycase(header, index + 1)] = cookie;
        });

        return result;
      }

      result[header.toLowerCase()] = Array.isArray(value)
        ? value.join(",")
        : value;

      return result;
    }, {}),
  };
};

module.exports = handleHeaders;
