import React from 'react';
import styled from 'styled-components';

import './App.css';

import NavBar from './components/NavBar';
import CheckinsState from './state/Checkins';
import Goals from './Goals';
import Checkins from './Checkins';
import Dashboard from './Dashboard';
import { BoxShadow, Colors, DefaultMediaBreakpoint, getSize } from './constants';

const Main = () => {
  const {
    shouldPlayAlert,
    toggleShouldPlayAlert,
  } = CheckinsState.useContainer();

  return (
    <Container>
      <NavBar
        shouldPlayAlert={shouldPlayAlert}
        toggleShouldPlayAlert={toggleShouldPlayAlert}
      />

      <Sections>
        <Goals />
        <Checkins />
        <Dashboard />
      </Sections>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Sections = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "goals checkins"
    "dashboard checkins";

  margin: 20px;

  > div {
    margin: ${getSize('* 2')};
    padding: ${getSize('* 2')};
    border: 1px solid ${Colors.grey4};
    border-radius: 5px;
    box-shadow: ${BoxShadow.card};
  }

  ${DefaultMediaBreakpoint} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    grid-template-areas:
      "checkins"
      "goals"
      "dashboard";

    margin: 0;

    > div {
      margin: 0;
      padding: ${getSize('* 3')};
      border: none;
      border-top: 1px solid ${Colors.grey4};
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

export default Main;
