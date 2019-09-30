import { createStore, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import { createReducer } from './reducer';

const sagaMiddleware = createSagaMiddleware()

export function injectAsyncReducer(name, asyncReducer) {
  if (name in store.asyncReducers && store.asyncReducers[name] !== asyncReducer) {
    console.warn(`trying to inject a different reducer in the same location: ${name}`);
    return;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function injectSaga(name, saga) {
  if (name in store.sagas && store.sagas[name] !== saga) {
    console.warn(`trying to inject a different saga in the same location: ${name}`);
    return;
  }
  store.sagas[name] = saga;
  sagaMiddleware.run(saga);
}

const initialState = {};

export const store = createStore(
  createReducer(),
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    devToolsEnhancer(),
  ),
)
store.asyncReducers = {};
store.sagas = {};
