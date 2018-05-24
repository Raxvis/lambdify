export const objectToArray = (obj, keyName) => Object.keys(obj).map((key) => (
	keyName ? {
		...obj[key],
		[keyName]: key,
	} : obj[key]
));

export const ota = objectToArray;

export default objectToArray;