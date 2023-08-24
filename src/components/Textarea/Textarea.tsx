import styled from 'styled-components';
import { BoxShadow, Colors, DefaultFontSize, getSize } from '../../constants';

const StyledTextarea = styled.textarea`
  background-color: ${Colors.white};
  color: ${Colors.black};

  padding: ${getSize()} ${getSize('* 2')};
  font-size: ${DefaultFontSize};

  border: 1px solid ${Colors.grey4};
  border-radius: ${getSize('/ 2')};
  box-shadow: ${BoxShadow.primary};

  transition: 300ms filter;

  &:hover {
    filter: brightness(0.95);
  }

  &:focus {
    filter: brightness(1);
  }

  &:disabled, &:read-only {
    cursor: not-allowed;
    filter: brightness(0.95);
  }
`;

export default StyledTextarea;
