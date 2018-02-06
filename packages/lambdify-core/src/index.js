import deployFile from './deploy/file';
import deployFunction from './deploy/function';
import deployProject from './deploy/project';
import fs from 'fs';
import path from 'path';
import utils from './utils';

const startDeployment = async (projectPath, options) => {
	if (path.join(projectPath, 'project.json')) {
		await deployProject(projectPath, options);
	} else if (path.join(projectPath, 'function.json')) {
		await deployFunction(projectPath, options);
	} else if (fs.lstatSync(projectPath).isFile()) {
		await deployFile(projectPath, options);
	} else if (fs.lstatSync(projectPath).isDirectory()) {
		await deployProject(projectPath, options);
	} else {
		throw new Error(`Path: ${projectPath} is not a project or function`);
	}
};

export const deploy = async (...args) => {
	const projectPath = args.shift();
	const cb = utils.getCallback(args.pop());
	const opt = utils.getOptions(args.pop());

	try {
		opt.feedback('Lambdify Starting Up');
		await startDeployment(path.resolve(projectPath), opt);

		opt.feedback('Lambdify Finished');
	} catch (error) {
		opt.feedback('Lambdify Failed');
		opt.feedback(error);
	}

	return cb ? cb() : true;
};

export default { deploy };