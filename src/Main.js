import React from 'react';
import styled, { css } from 'styled-components';

import './App.css';

import NavBar from './components/NavBar';
import Config from './state/Config';
import Goals from './Goals';
import Checkins from './Checkins';
import Dashboard from './Dashboard';
import { BoxShadow, Colors, DefaultMediaBreakpoint, getSize } from './constants';

const Main = () => {
  const {
    shouldPlayAlert,
    shouldShowGoalsAndDashboard,
    toggleShouldPlayAlert,
    toggleShouldShowGoalsAndDashboard,
  } = Config.useContainer();

  return (
    <Container>
      <NavBar
        shouldPlayAlert={shouldPlayAlert}
        toggleShouldPlayAlert={toggleShouldPlayAlert}
        shouldShowGoalsAndDashboard={shouldShowGoalsAndDashboard}
        toggleShouldShowGoalsAndDashboard={toggleShouldShowGoalsAndDashboard}
      />

      <Sections isHidden={!shouldShowGoalsAndDashboard}>
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

const hiddenGoalsAndDashboardStyle = css`
  grid-template-columns: 0px 1fr;
  grid-template-rows: 0px 1fr;
`;

const hiddenGoalsAndDashboardMobileStyle = css`
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0px 0px;
`;

const Sections = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "goals checkins"
    "dashboard checkins";

  transition: 500ms all;

  margin: 20px;

  > div {
    margin: ${getSize('* 2')};
    padding: ${getSize('* 2')};
    border: 1px solid ${Colors.grey4};
    border-radius: 5px;
    box-shadow: ${BoxShadow.card};
  }

  ${(props) => props.isHidden ? hiddenGoalsAndDashboardStyle : ''}

  ${DefaultMediaBreakpoint} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    grid-template-areas:
      "checkins"
      "goals"
      "dashboard";

    ${(props) => props.isHidden ? hiddenGoalsAndDashboardMobileStyle : ''}

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
