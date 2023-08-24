// @ts-ignore
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components'

import { BoxShadow, Colors, DefaultFontSize, getSize } from '../../constants'

const StyledSelect = styled(CreatableSelect)`
  & div[class$="-control"] {
    background-color: ${Colors.white};

    height: ${getSize('* 4.25')};
    min-height: ${getSize('* 4')};
    margin: 0;

    font-size: ${DefaultFontSize};

    border: 1px solid ${Colors.grey4};
    border-radius: ${getSize('/ 2')};
    box-shadow: ${BoxShadow.primary};

    transition: 300ms filter;

    &:hover, &:focus {
      filter: brightness(0.95);
    }
  }

  & div[class$="-ValueContainer"] {
    color: ${Colors.black};
    padding: 0 ${getSize('* 2')};
  }

  & div[class$="-IndicatorsContainer"] {
    height: ${getSize('* 4')};
  }

  & div[class$="option"] {
    font-size: ${DefaultFontSize};
  }
`

export default StyledSelect;
