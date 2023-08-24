import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/logo.png';
import { BoxShadow, Colors, getSize } from '../../constants';
import ToggleButton from '../ToggleButton';

type Props = {
  shouldPlayAlert: boolean;
  toggleShouldPlayAlert: () => void;
};

const NavBar = ({ shouldPlayAlert, toggleShouldPlayAlert }: Props) => {
  return (
    <Container>
      <Name>
        <Logo src={logo} />
        <Title>YECT</Title>
        <SubTitle>Yet Another Checkin Tool</SubTitle>
      </Name>
      <Actions>
        <ToggleButton title="Play 8-hour alert?" isChecked={shouldPlayAlert} onClick={toggleShouldPlayAlert}>
          <FontAwesomeIcon icon={faMusic} />
        </ToggleButton>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${getSize('* 6')};
  width: 100%;

  background-color: ${Colors.navbar};
  border-bottom: 1px solid ${Colors.grey4};
  box-shadow: ${BoxShadow.primary};
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${getSize()};
  align-items: center;

  padding: 0 ${getSize('* 4')};
`;

const Logo = styled.img`
  margin-top: ${getSize('/ -2')};
  width: ${getSize('* 4')};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${getSize()};

  padding: 0 ${getSize('* 4')};
`;

const Title = styled.div`
  font-weight: bold;
  color: ${Colors.primary};
`;

const SubTitle = styled.div`
  color: ${Colors.grey3};
`;

export default NavBar;
