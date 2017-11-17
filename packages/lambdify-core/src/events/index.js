import apig from './apig';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const loadJSONEventsFile = (file) => {
	try {
		return JSON.parse(fs.readFileSync(file));
	} catch (error) {
		return [];
	}
};

export const deployFunction = async (functionPath, options) => {
	const events = loadJSONEventsFile(path.join(functionPath, 'events.json'))
		.map((event) => ({
			...event,
			functionPath
		}));
	const httpEvents = events.filter((event) => event.http);

	if (httpEvents.length > 0) {
		await apig.deployFunction(functionPath, httpEvents, options);
	}
};

export const deployProject = async (projectPath, options) => {
	const events = glob.sync(path.join(projectPath, '*', path.sep, 'events.json'))
		.reduce((results, eventFile) => ([
			...results,
			...loadJSONEventsFile(eventFile).map((event) => ({
				...event,
				functionPath: eventFile.replace(`${path.sep}events.json`, ``)
			}))
		]), []);
	const httpEvents = events.filter((event) => event.http);

	if (httpEvents.length > 0) {
		await apig.deployProject(projectPath, httpEvents, options);
	}
};

export default {
	deployFunction,
	deployProject
};