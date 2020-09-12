import React from 'react';
import styled from 'styled-components';

const InputField = styled.input`
  width: 100%;
  max-width: 500px;
  height: 40px;
  font-size: 16px;
  padding: 0px 10px;
  border: 1px solid grey;
  // border-radius: 5px 0px 0px 5px;
`;

function TextField({
  name,
  value,
  onChange
}) {
  return(
    <InputField required name={name} value={value} onChange={(e) => onChange(e.target.value)}/>
  )
}

export default TextField;