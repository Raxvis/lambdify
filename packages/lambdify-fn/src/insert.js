const insertArray = (index, func) => async (params) => [
	...params.slice(0, index - 1),
	await func(params),
	...params.slice(index - 1),
];

const insertObject = (index, func) => async (params) => ({
	...params,
	[index]: await func(params),
});

export const insert = (index, func) => (params) =>
	Array.isArray(params) ? insertArray(index, func)(params) : insertObject(index, func)(params);

export default insert;
