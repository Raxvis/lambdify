const merge = (first, second) => ({
	...first,
	...second,
});

export const arrayToObject = (array, key, mergeFN) =>
	array.reduce((result, record, index) => {
		const lookupKey = typeof key === 'function' ? key(record) : record[key] || index;

		return {
			...result,
			[lookupKey]: mergeFN ? mergeFN(record, result[lookupKey]) : merge(result[lookupKey], record),
		};
	}, {});

export const ato = arrayToObject;

export default arrayToObject;
