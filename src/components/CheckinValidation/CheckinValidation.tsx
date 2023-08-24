import styled from "styled-components";
import { COMPLETE_CHECKIN_ALERT, getSize } from "../../constants";

type Props = {
  shouldPlayAlert: boolean;
};

const CheckinValidation = ({ shouldPlayAlert }: Props) => {
  if (!shouldPlayAlert) {
    return null;
  }

  return (
    <Frame
      title='drugz'
      width='560'
      height='315'
      src={COMPLETE_CHECKIN_ALERT}
      allow='autoplay; encrypted-media'
      allowFullScreen
    />
  );
};

const Frame = styled.iframe`
  display: none;
  margin-top: ${getSize()};
  border: none;
`;

export default CheckinValidation;
