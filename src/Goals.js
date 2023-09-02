import React from 'react';
import styled from 'styled-components';

import Box from './components/Box';
import Input from './components/Input';
import Textarea from './components/Textarea';
import { getSize } from './constants';
import State from './state/Goals';
import Config from './state/Config';

const Goals = () => {
  const { shouldShowGoals } = Config.useContainer();

  const {
    baseHours,
    setBaseHours,
    goalsStr,
    setGoalsStr,
  } = State.useContainer();

  return (
    <Container isHidden={!shouldShowGoals}>
      <div>
        <h1>Weekly Goals</h1>
        <p>
          This affects the values displayed in the <strong>Dashboard</strong>.
        </p>
      </div>
      <Section>
        <label htmlFor="hours-input">
          <b>Base hours</b>
        </label>
        <StyledInput id="hours-input" value={baseHours} onChange={setBaseHours} type="number" min="0" step="1" />
      </Section>
      <Section>
        <label htmlFor="goals-input">
          <b>Input goals</b>
        </label>
        <StyledTextarea
          id="goals-input"
          value={goalsStr}
          onChange={setGoalsStr}
          placeholder="Put here the bullet points of your weekly goals as sent by AnaTMy"
        />
      </Section>
    </Container>
  )
}

const Container = styled(Box)`
  grid-area: goals;
  display: flex;
  flex-direction: column;
  gap: ${getSize('* 2')};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getSize('/ 2')};
  padding: ${getSize('/ 2')};
`;

const StyledInput = styled(Input)`
  width: auto;
`;

const StyledTextarea = styled(Textarea)`
  width: auto;
  height: ${getSize('* 20')};
`;

export default Goals
