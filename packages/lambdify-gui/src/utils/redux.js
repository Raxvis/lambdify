import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

export const actionCreatorCreator = (type) => (
	(payload) => ({
		payload,
		type
	})
);

export const createActions = (models, topLevel) => (
	Object.keys(models).reduce((accumulator, key) => {
		if (models[key].actions) {
			accumulator[key] = models[key].actions;
		}

		return accumulator;
	}, topLevel || {}));

export const createReducer = (models) => (combineReducers(Object.keys(models).reduce((accumulator, key) => {
	if (models[key].reducer) {
		accumulator[key] = models[key].reducer;
	}

	return accumulator;
}, {})));

export const createSagas = (models, topLevel) => (function *sagas () {
	if (topLevel) {
		yield fork(topLevel);
	}
	for (const key in models) {
		if (models[key].sagas) {
			yield fork(models[key].sagas);
		}
	}
});

export const createSelectors = (models, topLevel) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].selectors) {
		accumulator[key] = models[key].selectors;
	}

	return accumulator;
}, topLevel || {}));

export const createTypes = (models, topLevel) => (Object.keys(models).reduce((accumulator, key) => {
	if (models[key].types) {
		accumulator[key] = models[key].types;
	}

	return accumulator;
}, topLevel || {}));