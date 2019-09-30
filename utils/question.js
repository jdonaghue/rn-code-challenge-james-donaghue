export const isAnswerCorrect = (correct_answer, answer) => {
  return (correct_answer === 'True' && answer) || (correct_answer === 'False' && !answer);
}
