import React from 'react';
import styled from 'styled-components';

const BtnDiv = styled.div`
  background: #2eabab;
  color: white;
  // border-radius: 0px 5px 5px 0px;
  display: flex;
  align-items: center;
  padding: 10px 35px;
  cursor: pointer;
  justify-content: center;
`;

function Button({
  text,
  onClick
}) {
  return(
    <BtnDiv
      onClick={() => onClick && onClick()}
    >
      {text || 'Add Description'}
    </BtnDiv>
  )
}

export default Button;