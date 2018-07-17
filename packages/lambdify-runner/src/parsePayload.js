export const parsePayload = ({ errorMessage, message, payload, status }) => {
	if (errorMessage) {
		throw new Error(errorMessage);
	} else if (status && status === 'error') {
		throw new Error(message);
	}

	return payload;
};

export default parsePayload;
