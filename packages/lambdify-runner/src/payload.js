export const payload = (body, error) => {
	const response = {
		debug: error ? error.stack : '',
		message: error ? error.message : '',
		name: process.env.AWS_LAMBDA_FUNCTION_NAME,
		payload: body,
		status: error ? 'error' : 'success',
		timestamp: Math.floor(Date.now() / 1000),
	};

	if (error && error.code) {
		response.error = {
			code: error.code,
			message: error.message,
			name: error.name,
			statuscode: error.statusCode,
			type: error.type,
		};
	}

	return response;
};

export default payload;