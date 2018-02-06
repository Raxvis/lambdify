import apig from './apig';
import path from 'path';
import utils from './../utils';

export const deployFunction = async (functionPath, options) => {
	const events = utils.loadJSONFile(path.join(functionPath, 'events.json'))
		.map((event) => ({
			...event,
			functionPath,
		}));
	const httpEvents = events.filter((event) => event.http);

	if (httpEvents.length > 0) {
		await apig(functionPath, httpEvents, options);
	}
};

export default deployFunction;