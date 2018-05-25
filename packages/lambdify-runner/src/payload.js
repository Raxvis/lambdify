export const payload = (body, error) => {
	const response = {
		debug: error ? error.stack : '',
		message: error ? error.message : '',
		name: process.env.AWS_LAMBDA_FUNCTION_NAME || 'no_name',
		payload: body,
		status: error ? 'error' : 'success',
		timestamp: Math.floor(Date.now() / 1000),
	};

	if (error) {
		response.error = JSON.parse(JSON.stringify(error));
	}

	return response;
};

export default payload;
