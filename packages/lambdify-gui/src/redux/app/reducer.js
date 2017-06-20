import { types } from './actions';

const defaultState = {
	loading: false,
	saving: false
};

export default function reducer (state = defaultState, action) {
	switch (action.type) {
	case types.APP_LOADED:
		return {
			...state,
			loading: false
		};
	case types.APP_LOADING:
		return {
			...state,
			loading: true
		};
	case types.APP_SAVED:
		return {
			...state,
			saving: false
		};
	case types.APP_SAVING:
		return {
			...state,
			saving: true
		};
	default:
		return state;
	}
}
