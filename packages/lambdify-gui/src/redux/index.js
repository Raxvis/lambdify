import { createActions, createReducer, createSagas, createSelectors, createTypes } from 'utils/redux';
import app from './app';
import projects from './projects';

const models = {
	app,
	projects
};

export const actions = createActions(models);
export const reducer = createReducer(models);
export const sagas = createSagas(models);
export const selectors = createSelectors(models);
export const types = createTypes(models);