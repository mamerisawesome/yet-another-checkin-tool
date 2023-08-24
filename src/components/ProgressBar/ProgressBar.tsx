import styled from 'styled-components';

import { Colors } from '../../constants';

type Goal = {
  targetHrs: number;
  project: string;
};

type Props = {
  goal: Goal;
  actualHours: number;
  progressPercent: number;
};

const ProgressBar = ({ goal, actualHours, progressPercent }: Props) => {
  const { targetHrs } = goal;

  return (
    <Bar>
      <ActualProgress width={(actualHours / targetHrs) * 100}>
        {progressPercent}%
      </ActualProgress>
    </Bar>
  );
};

const Bar = styled.div<{ width?: number }>`
  max-width: 100%;
  width: 100%;

  background-color: ${Colors.white};
  border: 1px solid black;
`;

const ActualProgress = styled(Bar)`
  width: ${(props) => props.width + '%' };
  background-color: ${(props) => props.width! > 100 ? Colors.success : Colors.danger};
`;

export default ProgressBar;
