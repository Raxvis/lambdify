import apig from './apig';
import glob from 'glob';
import path from 'path';
import utils from './../utils';

const getApigName = (projectPath, options) => {
	const { APIGateway, stage } = {
		...utils.loadJSONFile(path.join(projectPath, 'project.json')),
		...options,
	};
	const apigName = APIGateway ? APIGateway : projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop();

	return stage ? `${apigName}-${stage}` : apigName;
};

const deployProject = async (projectPath, options) => {
	const files = glob.sync(path.join(projectPath, '*', path.sep, 'events.json'));

	options.apigName = getApigName(projectPath, options);

	await apig(projectPath, options, files);
};

export default deployProject;