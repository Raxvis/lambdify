import { fork, takeEvery } from 'redux-saga/effects';
import { types } from './actions';

function *initClient () {
	console.log('app started');
}

export default function *watch () {
	yield fork(takeEvery, types.INIT_CLIENT, initClient);
}