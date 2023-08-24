import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { getSize } from '../../constants';

type Props = {
  name: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ name, isChecked, onChange }: Props) => {
  return (
    <Container>
      <input id={name} name={name} type="checkbox" checked={isChecked} onChange={onChange} />
      <label htmlFor={name}>Play 8-hour alert?</label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${getSize('/ 2')};
  padding: ${getSize()} 0;

  & label {
    padding-top: 1px;
  }
`;

export default Checkbox;
