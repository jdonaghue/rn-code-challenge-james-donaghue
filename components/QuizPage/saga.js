import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { questionsLoaded, questionsLoadingError } from './actions';
import { FETCH_QUESTIONS } from './constants';

export function* getQuestions() {
  const requestURL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean&&encode=url3986';

  try {
    const { data: { results: questions } } = yield call(axios, requestURL);
    yield put(questionsLoaded(questions));
  } catch (err) {
    yield put(questionsLoadingError(err));
  }
}

export default function* questionsSaga() {
  yield takeLatest(FETCH_QUESTIONS, getQuestions);
}
