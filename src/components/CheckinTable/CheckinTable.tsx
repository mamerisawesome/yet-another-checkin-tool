import styled from 'styled-components';

import { Colors, getSize } from '../../constants';

const StyledTable = styled.table`
  width: 100%;

  border: 1px solid ${Colors.grey4};
  border-radius: ${getSize('/ 2')};

  & td {
    padding: ${getSize('/ 2')};
  }

  & tr:hover {
    background: #EEE;
  }

  & td:last-child {
    width: 30px;
  }
`;

export default StyledTable;
