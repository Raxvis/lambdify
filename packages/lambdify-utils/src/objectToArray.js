const merge = (initial, key, value) => ({
	...initial,
	[key]: value,
});

export const objectToArray = (obj, keyName) =>
	Object.keys(obj).map((key) => (keyName ? merge(obj[key], keyName, key) : obj[key]));

export const ota = objectToArray;

export default objectToArray;
