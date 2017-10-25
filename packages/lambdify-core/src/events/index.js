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
	const events = loadJSONEventsFile(path.join(functionPath, 'events.json'));

	if (events.http) {
		await apig.deployFunction(options, functionPath, events.http);
	}
};

export const deployProject = async (projectPath, options) => {
	const functions = glob.sync(path.join(projectPath, '*', path.sep));
	const events = functions.map((functionPath) => ({
		events: loadJSONEventsFile(path.join(functionPath, 'events.json')),
		functionPath
	}));
	const apigEvents = events.map((functionEvent) => ({
		...functionEvent,
		events: functionEvent.events ? functionEvent.events.filter((event) => Boolean(event.http)).map((event) => event.http) : undefined
	})).filter((functionEvent) => functionEvent.events.length > 0);

	if (apigEvents.length > 0) {
		await apig.deployProject(options, apigEvents);
	}
};

export default {
	deployFunction,
	deployProject
};