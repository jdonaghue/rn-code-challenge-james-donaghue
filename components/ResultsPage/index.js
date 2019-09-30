import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { selectAnswers } from './selectors';
import { isAnswerCorrect } from '../../utils/question';

const StyledView = styled.View`
  padding-top: 40px;
`;

const H1 = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const H2 = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CorrectQuestion = styled.Text`
  border: 1px solid green;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  padding: 20px;
`;

const Question = styled.Text`
  border: 1px solid red;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  padding: 20px;
`;

const PlayAgainButton = styled.Button`
  border: none;
  background: #e7a61a;
  color: #ffffff;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 24px;
`;

class ResultsPage extends Component {
  static propTypes = {
    answers: PropTypes.array,
  };

  playAgain= () => {
    this.props.navigation.navigate('Home');
  }

  renderQuestions() {
    const { answers } = this.props;

    return (
      <ScrollView>
        <H1>You scored</H1>
        <H2>{
          answers.filter(a => isAnswerCorrect(a.question.correct_answer, a.answer)).length
        } / {answers.length}
        </H2>
        {
          answers.map(({ question: q, answer }) => (
            <ScrollView key={q.question}>
              {
                isAnswerCorrect(q.correct_answer, answer) ? (
                  <CorrectQuestion>
                    {decodeURIComponent(q.question)}
                  </CorrectQuestion>
                ) : (
                  <Question>
                    {decodeURIComponent(q.question)}
                  </Question>
                )
              }
              <H2>You Answered: {answer ? 'True' : 'False'}</H2>
              <H2>Correct Answer: {q.correct_answer}</H2>
              <H2>You were {isAnswerCorrect(q.correct_answer, answer) ? 'Correct' : 'Not Correct'}</H2>
            </ScrollView>
          ))
        }
        <PlayAgainButton title="Play Again!" onPress={this.playAgain} />
      </ScrollView>
    );
  }

  render() {
    const { answers } = this.props;

    return (
      <StyledView>
        {
          answers && this.renderQuestions()
        }
      </StyledView>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: selectAnswers(state),
});

export default connect(mapStateToProps)(ResultsPage);
