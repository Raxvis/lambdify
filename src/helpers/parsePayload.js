module.exports = (response) => {
	if (response.errorMessage) {
		throw new Error(response.errorMessage);
	} else if (response.status && response.status === 'error') {
		throw new Error(response.message);
	}

	return response;
};
