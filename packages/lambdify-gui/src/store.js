import { actions, reducer, sagas } from './redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line no-underscore-dangle

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

store.dispatch(actions.app.initClient());