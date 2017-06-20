import { types } from './actions';

const defaultState = [];

export default function reducer (state = defaultState, action) {
	switch (action.type) {
	case types.LOAD_PROJECTS:
		return [
			...state,
			...action.payload
		];
	case types.ADD_PROJECT:
		return [
			...state,
			action.payload
		];
	default:
		return state;
	}
}
