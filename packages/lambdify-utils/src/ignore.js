export const ignore = (fn, returnError = false, log = false) => async (...params) => {
	try {
		const response = await fn(...params);

		return response;
	} catch (error) {
		if (log) {
			console.log(error);
		}

		if (returnError) {
			return error;
		}
	}

	return undefined;
};

export default ignore;
