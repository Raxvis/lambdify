import fs from 'fs';
import path from 'path';

const divider = (/^win/).test(process.platform) ? '\\' : '/';

export const getProject = (folder) => {
	const name = folder.split(divider).pop();
	const projectJSON = path.join(folder, 'project.json');

	try {
		if (fs.existsSync(projectJSON)) {
			const fileBuf = fs.readFileSync(projectJSON);
			const data = JSON.parse(fileBuf.toString());

			return data;
		}
		fs.writeFileSync(projectJSON, JSON.stringify({ name }));
	} catch (error) {
		console.log('Failed to load project config');
	}

	return {};
};

export const getProjectName = (folder) => {
	const name = folder.split(divider).pop();
	const project = getProject(folder);

	if (project.name) {
		return project.name;
	}

	return name;
};