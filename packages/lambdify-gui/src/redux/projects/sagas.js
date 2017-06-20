import { actions, types } from './actions';
import { fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { types as appTypes } from './../app/actions';
import fs from 'fs';
import path from 'path';

const configPath = path.join('config.json');

function *initClient () {
	try {
		if (fs.existsSync(configPath)) {
			const fileBuf = fs.readFileSync(configPath);
			const config = JSON.parse(fileBuf.toString());

			if (config.projects) {
				yield put(actions.loadProjects(config.projects));
			}
		} else {
			fs.writeFileSync(configPath, JSON.stringify({}));
		}
	} catch (error) {
		console.log('Failed to load config');
		console.log(error);
	}
}

function *addProject (action) {
	console.log(action.payload);

	const projects = yield select((state) => state.projects);
	const fileBuf = fs.readFileSync(configPath);
	const config = JSON.parse(fileBuf.toString());

	config.projects = projects;
	fs.writeFileSync(configPath, JSON.stringify(config));
}

export default function *watch () {
	yield fork(takeEvery, appTypes.INIT_CLIENT, initClient);
	yield fork(takeLatest, types.ADD_PROJECT, addProject);
}