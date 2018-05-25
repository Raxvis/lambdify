export const constant = (func) => async (params) => {
	await func(params);

	return params;
};

export default constant;
