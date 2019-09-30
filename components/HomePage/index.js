import React from 'react';
import styled from 'styled-components/native';

const StyledView = styled.View`
  padding-top: 40px;
`;

const StyledButton = styled.Button`
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  background: #e7a61a;
  color: #ffffff;
  margin-right: 10px;
  padding: 10px 20px;
`;

const H1 = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const H2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

function HomePage({ navigation }) {
  return (
    <StyledView>
      <H1>Welcome to the Trivia Challenge!</H1>
      <H2>You will be presented with 10 True or False questions.</H2>
      <H2>Can you score 100%?</H2>
      <StyledButton
          title="Begin"
          onPress={() => navigation.navigate('Quiz', {
            step: 1,
          })}
        />
    </StyledView>
  );
}

export default HomePage;
