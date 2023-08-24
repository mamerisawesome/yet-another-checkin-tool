import { ReactNode } from 'react'
import styled from 'styled-components'

import { BoxShadow, Colors, getSize } from '../../constants'

export type Props = {
  title?: string;
  className?: string;
  children?: ReactNode;
  type?: keyof typeof CONFIG;
  onClick: () => void;
};

const CONFIG = {
  default: `
    background-color: ${Colors.white};
    color: ${Colors.black};
  `,
  primary: `
    background-color: ${Colors.primary};
    color: ${Colors.white};
  `,
};

const Button = ({ className, children, title, type, onClick }: Props) => {
  return (
    <StyledButton
      className={className}
      title={title}
      styleConfig={type ? CONFIG[type] : CONFIG.default}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ styleConfig?: string }>`
  ${(props) => props.styleConfig}

  cursor: pointer;

  font-weight: bold;

  height: ${getSize('* 4')};
  padding: 0 ${getSize('* 2')};

  border: 1px solid ${Colors.grey4};
  border-radius: ${getSize('/ 2')};
  box-shadow: ${BoxShadow.primary};

  transition: 300ms filter;

  &:hover {
    filter: brightness(0.85);
  }
`

export default Button;
