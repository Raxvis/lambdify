import deployer from './deployer';
import events from './events';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import utils from './utils';

const deployFunction = async (functionPath, options) => {
	const combinedOptions = utils.getFunctionOptions(functionPath, options);

	if (!combinedOptions.eventsOnly) {
		await deployer(functionPath, combinedOptions);
	}

	if (!combinedOptions.functionsOnly) {
		await events.deployFunction(functionPath, combinedOptions);
	}
};

const deployProject = async (projectPath, options) => {
	const functions = glob.sync(path.join(projectPath, '*', path.sep));
	const { functionsOnly } = options;
	const combinedOptions = {
		...options,
		functionsOnly: true
	};

	if (!combinedOptions.eventsOnly) {
		await Promise.all(functions.map((functionPath) => deployFunction(functionPath, combinedOptions)));
	}


	if (!functionsOnly) {
		delete combinedOptions.functionsOnly;
		await events.deployProject(projectPath, options);
	}
};

const startDeployment = async (projectPath, functionName, options) => {
	if (functionName && fs.existsSync(path.join(projectPath, functionName))) {
		await deployFunction(path.join(projectPath, functionName), options);
	} else if (fs.existsSync(path.join(projectPath))) {
		await deployProject(projectPath, options);
	} else {
		options.feedback(`ERROR: Path: ${path.join(projectPath, functionName)} is not a project or function`);
		throw new Error(`Path: ${path.join(projectPath, functionName)} is not a project or function`);
	}
};

const getCallback = (functionName, options, callback) => {
	if (typeof functionName === 'function') {
		return functionName;
	}
	if (typeof options === 'function') {
		return options;
	}
	if (typeof callback === 'function') {
		return callback;
	}

	return false;
};

const getOptions = (functionName, options) => {
	if (typeof functionName === 'object') {
		return {
			...functionName,
			feedback: functionName.feedback || utils.feedback
		};
	}
	if (typeof options === 'object') {
		return {
			...options,
			feedback: options.feedback || utils.feedback
		};
	}

	return { feedback: utils.feedback };
};

const getFunctionName = (functionName) => {
	if (typeof functionName === 'string') {
		return functionName;
	}

	return false;
};

export const deploy = async (projectPath, functionName, options, callback) => { // eslint-disable-line max-params
	const cb = getCallback(functionName, options, callback);
	const opt = getOptions(functionName, options);
	const fnName = getFunctionName(functionName);

	try {
		opt.feedback('Lambdify Starting Up');
		await startDeployment(path.resolve(projectPath), fnName, opt);

		opt.feedback('Lambdify Finished');
	} catch (error) {
		opt.feedback('Lambdify Failed');
		opt.feedback(error);
	}

	return cb ? cb() : true;
};

export default { deploy };