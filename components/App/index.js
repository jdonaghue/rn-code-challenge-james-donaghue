import React, { Component } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/HomePage';
import QuizPage from 'components/QuizPage';
import ResultsPage from 'components/ResultsPage';
import FourOhFourPage from 'components/FourOhFourPage';

const Wrapper = styled.div`
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Helmet
          titleTemplate="%s - Trivia Game"
          defaultTitle="Trivia Game"
        >
          <meta name="description" content="A Trivia Game" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/quiz/:step?" component={QuizPage} />
          <Route exact path="/results" component={ResultsPage} />
          <Route path="" component={FourOhFourPage} />
        </Switch>
      </Wrapper>
    );
  }
}

export default App;
