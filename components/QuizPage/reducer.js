import produce from 'immer';
import {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_ERROR,
  SET_ANSWERS,
} from './constants';

const initialState = {
  loading: false,
  error: null,
  questions: [],
  answers: [],
};

function quizPageReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH_QUESTIONS:
        draft.loading = true;
        draft.error = null;
        draft.questions = [];
        draft.answers = [];
        break;
      case FETCH_QUESTIONS_SUCCESS:
        draft.questions = action.questions;
        draft.loading = false;
        break;
      case FETCH_QUESTIONS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case SET_ANSWERS:
        draft.answers = action.answers;
        break;
      default:
        break;
    }
  });
}

export default quizPageReducer;
