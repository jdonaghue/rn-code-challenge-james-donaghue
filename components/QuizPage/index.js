import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { injectAsyncReducer, injectSaga } from '../../store';
import saga from './saga';
import reducer from './reducer';
import { fetchQuestions, setAnswers } from './actions';
import {
  selectQuestions,
  selectLoading,
  selectError,
  selectAnswers,
} from './selectors';

const H1 = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Question = styled.Text`
  border: 1px solid #CDCDCD;
  margin-left: 25%;
  margin-right: 25%;
  width: 50%;
  padding: 20px;
`;

const TrueFalseWrapper = styled.ScrollView`
  margin-left: auto;
  margin-right: auto
  width: 100px;
  padding: 10px;
`;

const AnswerButton = styled.Button`
  border: none;
  background: #e7a61a;
  color: #ffffff;
  margin-right: 10px;
  padding: 10px 20px;
`;

const ErrorWrapper = styled.Text`
  color: red;
  text-align: center;
`;

class QuizPage extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    questions: PropTypes.PropTypes.array,
    t: PropTypes.func,
    setAnswers: PropTypes.func,
    fetchQuestions: PropTypes.func,
    history: PropTypes.object,
    answers: PropTypes.array,
  };

  componentWillMount() {
    this.props.fetchQuestions();
  }

  answerTrue = (e) => this.answer(e, true)

  answerFalse = (e) => this.answer(e, false)

  answer = (e, truth) => {
    e.stopPropagation();
    e.preventDefault();

    const { answers, questions, navigation, history } = this.props;
    const step = navigation.getParam('step', 1);

    const question = questions[step - 1];
    const newAnswers = answers.slice().reduce((acc, { question, answer }) => {
      acc.push({
        question: {
          ...question,
        },
        answer,
      });
      return acc;
    }, []);

    newAnswers.push({
      question: {
        ...question,
      },
      answer: truth,
    });

    this.props.setAnswers(newAnswers);

    if (Number(step) === 10) {
      navigation.navigate('Results');
    } else {
      navigation.navigate('Quiz', { step: Number(step) + 1 });
    }
  }

  renderQuestion() {
    const { questions, navigation } = this.props;
    const step = navigation.getParam('step', 1);
    const q = questions[step - 1] || questions[9];

    if (!q) {
      return null;
    }

    return (
      <ScrollView>
        <H1>
          {decodeURIComponent(q.category)}
        </H1>
        <Question>
          {decodeURIComponent(q.question)}
        </Question>
        <TrueFalseWrapper>
          <AnswerButton title="True" onPress={this.answerTrue} />
          <AnswerButton title="False" onPress={this.answerFalse} />
        </TrueFalseWrapper>
      </ScrollView>
    );
  }

  render() {
    const { loading, error } = this.props;

    return (
      <View>
        {
          loading ? <Text>Loading...</Text> : this.renderQuestion()
        }
        {
          error ? (
            <ErrorWrapper>
              {error === true ? 'Error' : error.message}
            </ErrorWrapper>
          ) : null
        }
      </View>
    );
  }
}


injectAsyncReducer('quiz', reducer);
injectSaga('quiz', saga);

const mapStateToProps = (state) => ({
  questions: selectQuestions(state),
  loading: selectLoading(state),
  error: selectError(state),
  answers: selectAnswers(state),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    setAnswers: (answers) => dispatch(setAnswers(answers)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
