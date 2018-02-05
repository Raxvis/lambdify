const fs = require('fs');
const path = require('path');

export const feedback = (message) => (console.log(message));
export const getFunctionName = (functionPath) => (functionPath.split(path.sep).filter((folder) => Boolean(folder)).pop());
export const getProjectName = (projectPath) => (projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop());
export const loadJSONFile = (file) => {
	try {
		return JSON.parse(fs.readFileSync(file));
	} catch (error) {
		return {};
	}
};
export const getFunctionOptions = (functionPath, options = {}) => ({
	...loadJSONFile(path.join(functionPath, '..', 'project.json')),
	...loadJSONFile(path.join(functionPath, 'function.json')),
	...options,
	functionName: getFunctionName(functionPath),
	projectName: getProjectName(path.join(functionPath, '..')),
});
export const getProjectOptions = (projectPath, options = {}) => ({
	...loadJSONFile(path.join(projectPath, 'project.json')),
	...options,
	projectName: getProjectName(projectPath),
});

export default {
	feedback,
	getFunctionName,
	getFunctionOptions,
	getProjectName,
	getProjectOptions,
	loadJSONFile,
};