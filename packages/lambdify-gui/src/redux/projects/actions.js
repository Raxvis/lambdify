import { actionCreatorCreator } from 'utils/redux';

export const types = {
	ADD_PROJECT: 'project/ADD_PROJECT',
	LOAD_PROJECTS: 'project/LOAD_PROJECTS'
};

export const actions = {
	addProject: actionCreatorCreator(types.ADD_PROJECT),
	loadProjects: actionCreatorCreator(types.LOAD_PROJECTS)
};

export default actions;