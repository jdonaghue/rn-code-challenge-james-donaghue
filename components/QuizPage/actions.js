import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR,
  SET_ANSWERS,
} from './constants';

export function fetchQuestions() {
  return {
    type: FETCH_QUESTIONS,
  };
};

export function questionsLoaded(questions) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    questions,
  };
};

export function questionsLoadingError(error) {
  return {
    type: FETCH_QUESTIONS_ERROR,
    error,
  };
};

export function setAnswers(answers) {
  return {
    type: SET_ANSWERS,
    answers,
  };
};
