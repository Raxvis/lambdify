export const payload = (body, error) => ({
	debug: error ? error.stack : '',
	message: error ? error.message : '',
	name: process.env.AWS_LAMBDA_FUNCTION_NAME,
	payload: body,
	status: error ? 'error' : 'success',
	timestamp: Math.floor(Date.now() / 1000),
});

export default payload;