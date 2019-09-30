import { createSelector } from 'reselect';

const selectQuizPageDomain = (state) => state.quiz;

export const selectLoading = createSelector(
  selectQuizPageDomain,
  (quizState) => quizState.loading,
)

export const selectError = createSelector(
  selectQuizPageDomain,
  (quizState) => quizState.error,
);

export const selectQuestions = createSelector(
  selectQuizPageDomain,
  (quizState) => quizState.questions,
);

export const selectAnswers = createSelector(
  selectQuizPageDomain,
  (quizState) => quizState.answers,
);
