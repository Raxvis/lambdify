import deployer from './deployer';
import eventsDeployFunction from './../events/function';
import merge from 'lodash.merge';
import path from 'path';
import utils from './../utils';

const deployFunction = async (functionPath, options) => {
	const functionOptions = utils.loadJSONFile(path.join(functionPath, 'function.json'));
	const combinedOptions = merge({}, options, functionOptions);
	const { eventsOnly, functionsOnly } = combinedOptions;

	if (!eventsOnly) {
		await deployer(functionPath, combinedOptions);
	}

	if (!functionsOnly) {
		await eventsDeployFunction(functionPath, combinedOptions);
	}
};


export default deployFunction;