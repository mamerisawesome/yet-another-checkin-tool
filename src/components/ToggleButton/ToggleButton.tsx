import styled from 'styled-components'

import Button, { ButtonProps } from '../Button';
import { getSize } from '../../constants';

type Props = {
  isChecked: boolean;
} & ButtonProps;

const ToggleButton = ({ title, className, children, isChecked, type, onClick }: Props) => {
  return (
    <Container
      className={className}
      title={title}
      onClick={onClick}
      type={type}
      isChecked={isChecked}
    >
      {children}
    </Container>
  );
};

const Container = styled(Button)<{ isChecked: boolean }>`
  display: flex;
  place-content: center;

  width: ${getSize('* 3')};
  height: ${getSize('* 3')};
  font-size: ${getSize('* 1.5')};

  padding: 0;
  border-radius: 50%;

  & > svg {
    align-self: center;
  }

  &, &:hover {
    filter: ${(props) => props.isChecked ? 'brightness(0.8)' : 'brightness(1)'};
  }
`

export default ToggleButton;
