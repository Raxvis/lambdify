import deployer from './deployer';
import events from './events';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const feedback = (message) => console.log(message);

const loadJSONFile = (file) => {
	try {
		return JSON.parse(fs.readFileSync(file));
	} catch (error) {
		return {};
	}
};

const deployFunction = async (functionPath, options) => {
	const projectPath = path.join(functionPath, '..');
	const projectOptions = loadJSONFile(path.join(projectPath, 'project.json'));
	const functionOptions = loadJSONFile(path.join(functionPath, 'function.json'));
	const combinedOptions = {
		...projectOptions,
		...functionOptions,
		...options,
		name: functionPath.split(path.sep).filter((folder) => Boolean(folder)).pop(),
		project: projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop()
	};

	if (!combinedOptions.eventsOnly) {
		await deployer(functionPath, combinedOptions);
	}

	if (!combinedOptions.functionsOnly && combinedOptions.deployEvents) {
		await events.deployFunction(functionPath, combinedOptions);
	}
};

const deployProject = async (projectPath, options) => {
	const functions = glob.sync(path.join(projectPath, '*', path.sep));
	const projectOptions = loadJSONFile(path.join(projectPath, 'project.json'));
	const combinedOptions = {
		...projectOptions,
		...options,
		functionsOnly: true,
		project: projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop()
	};

	if (!combinedOptions.eventsOnly) {
		await Promise.all(functions.map((functionPath) => deployFunction(functionPath, combinedOptions)));
	}

	if (options.deployEvents || options.eventsOnly) {
		delete combinedOptions.functionsOnly;
		await events.deployProject(projectPath, combinedOptions);
	}
};

const run = async (projectPath, options) => {
	if (options.function) {
		await deployFunction(path.join(projectPath, options.function), options);
	} else if (fs.existsSync(path.join(projectPath))) {
		await deployProject(projectPath, options);
	} else {
		options.feedback(`ERROR: Path: ${projectPath} is not a project, function`);
		throw new Error(`Path: ${projectPath} is not a project, function`);
	}
};

export const deploy = async (projectPath, options, callback) => {
	const safeFeedback = (options && options.feedback) || feedback;

	try {
		safeFeedback('Lambdify Starting Up');
		await run(projectPath, {
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