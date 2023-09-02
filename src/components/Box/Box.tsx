import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  className?: string;
  isHidden?: boolean;
  children: ReactNode
};

const Box = ({ className, children, isHidden }: Props) => {
  if (isHidden) {
    return <Container className={className} isHidden={isHidden} />;
  }

  return (
    <Container className={className} isHidden={isHidden}>
      {children}
    </Container>
  );
};

const hiddenStyle = css`
  opacity: 0;
  color: white;
  font-size: 0;
`;

const Container = styled.div<{ isHidden?: boolean }>`
  &, & > * {
    transition: 300ms all, 100ms font-size, 100ms width, 100ms height;

    ${(props) => props.isHidden ? hiddenStyle : 'opacity: 1;'}
  }
`;

export default Box;
