import { ReactNode } from "react";
import styled from "styled-components";
import { getSize } from "../../constants";

type Props = {
  children: ReactNode;
};

const Header = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.h3`
  display: flex;
  flex-direction: row;
  gap: ${getSize()};
  align-items: center;
`;

export default Header;
