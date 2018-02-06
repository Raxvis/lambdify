import deployFunction from './function';
import eventsDeployProject from './../events/project';
import glob from 'glob';
import merge from 'lodash.merge';
import path from 'path';
import sleep from 'sleep';
import utils from './../utils';

const backOff = (func, time = 5) => async (...params) => {
	try {
		await func(...params);
	} catch (error) {
		console.log(error);
		sleep.sleep(time);
		await backOff(func, time * 2)(...params);
	}
};

const deployProject = async (projectPath, options) => {
	const functionOptions = utils.loadJSONFile(path.join(projectPath, 'project.json'));
	const combinedOptions = merge({}, options, functionOptions);
	const { eventsOnly, functionsOnly } = combinedOptions;
	const functions = glob.sync(path.join(projectPath, '*', path.sep));
	const deployOptions = {
		...options,
		functionsOnly: true,
	};

	if (!eventsOnly) {
		for (let i = 0; i < functions.length; i += 1) {
			// We want to do syncronous deployments here mostly because of rate limits. We can also throttle here
			await backOff(deployFunction)(functions[i], deployOptions); // eslint-disable-line no-await-in-loop
		}
	}

	if (!functionsOnly) {
		await eventsDeployProject(projectPath, options);
	}
};

export default deployProject;