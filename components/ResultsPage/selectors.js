import { createSelector } from 'reselect';

const selectQuizPageDomain = (state) => state.quiz;

export const selectAnswers = createSelector(
  selectQuizPageDomain,
  (substate) => substate.answers
);
