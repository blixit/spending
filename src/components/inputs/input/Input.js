import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  min-height: 25px;
  lineheight: 25px;
  font-size: 16px;
  border: 0;
  border-bottom: 1px solid silver;
  background: transparent;
  &:focus{
    outline: none;
  }
`;

export const Input = (props) => {
  const { type, value, onChange, ...rest } = props;
  const change = useCallback(e => onChange(e.target.value), [onChange]);
  
  return(
    <StyledInput type={type} value={value} onChange={change} {...rest} />
  );
};

export const NumberInput = (props) => {
  const localProps = {...Object.assign({}, { type: 'number' }, props)};
  return <Input {...localProps} />;
}

export const TextInput = (props) => {
  const localProps = {...Object.assign({}, { type: 'text' }, props)};
  return <Input {...localProps} />;
}

export default Input;
