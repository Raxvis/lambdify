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

export const deploy = async (projectPath, functionName, options, callback) => { // eslint-disable-line max-params
	const safeFeedback = (options && options.feedback) || utils.feedback;

	try {
		safeFeedback('Lambdify Starting Up');
		await startDeployment(path.resolve(projectPath), functionName, {
			...options,
			feedback: safeFeedback
		});

		safeFeedback('Lambdify Finished');
	} catch (error) {
		safeFeedback('Lambdify Failed');
		safeFeedback(error);
	}

	const cb = callback || options;
	return typeof cb === 'function' ? cb() : true;
};

export default { deploy };