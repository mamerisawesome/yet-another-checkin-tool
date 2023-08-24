import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

import Button, { ButtonProps } from '../Button';
import { getSize } from '../../constants';

type Props = {
  icon: IconProp;
} & ButtonProps;

const IconButton = ({ className, children, icon, type, onClick }: Props) => {
  return (
    <Container
      className={className}
      onClick={onClick}
      type={type}
    >
      <FontAwesomeIcon icon={icon} />
      {children}
    </Container>
  );
};

const Container = styled(Button)`
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
`

export default IconButton;
