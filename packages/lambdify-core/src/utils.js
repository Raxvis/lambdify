const fs = require('fs');

export const feedback = (message) => (console.log(message));
export const getCallback = (callback) => (typeof callback === 'function' ? callback : false);
export const getOptions = (options) => ({
	...options,
	feedback: options.feedback || feedback,
});
export const loadJSONFile = (file) => {
	try {
		return JSON.parse(fs.readFileSync(file));
	} catch (error) {
		return {};
	}
};

export default {
	feedback,
	getCallback,
	getOptions,
	loadJSONFile,
};