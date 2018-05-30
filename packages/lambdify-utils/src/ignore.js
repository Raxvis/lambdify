export const ignore = (fn, returnError = false, log = false) => async (...params) => {
	try {
		const response = await fn(...params);

		return response;
	} catch (error) {
		if (log) {
			console.log(error);
		}

		return returnError ? error : undefined;
	}
};

export default ignore;
