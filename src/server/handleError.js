const handleError = (error, statusCode = 500) =>
	console.error(error) || {
		body: error.message,
		headers: {},
		isBase64Encoded: false,
		statusCode,
	};

module.exports = handleError;
