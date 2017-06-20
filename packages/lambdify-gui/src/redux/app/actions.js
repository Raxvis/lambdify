import { actionCreatorCreator } from 'utils/redux';

export const types = {
	APP_LOADED: 'app/APP_LOADED',
	APP_LOADING: 'app/APP_LOADING',
	APP_SAVED: 'app/APP_SAVED',
	APP_SAVING: 'app/APP_SAVING',
	INIT_CLIENT: 'app/INIT_CLIENT'
};

export const actions = {
	initClient: actionCreatorCreator(types.INIT_CLIENT),
	startLoad: actionCreatorCreator(types.APP_LOADING),
	startSave: actionCreatorCreator(types.APP_SAVING),
	stopLoad: actionCreatorCreator(types.APP_LOADED),
	stopSave: actionCreatorCreator(types.APP_SAVED)
};

export default actions;