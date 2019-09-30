import { combineReducers } from 'redux'

export function createReducer(asyncReducers) {
  if (asyncReducers) {
    return combineReducers({
      ...asyncReducers,
    });
  }
  return function () {}
}
