import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  min-height: 18px;
  lineheight: 18px;
  font-size: 0.8rem;
  border: 1px solid silver;
  border-radius: 3px;
  padding-right: 5px;
  padding-left: 5px;
  background: transparent;
  color: ${({ theme }) => theme.primary()};
  text-align: ${({ arabic }) => arabic ? 'right' : 'left'};

  &:focus{
    outline: none;
    border: 1px solid ${({ theme }) => theme.primary()};
  }

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.primary()};
    font-size: 0.8rem;
  }
  ::-moz-placeholder {
    color: ${({ theme }) => theme.primary()};
    font-size: 0.8rem;
  }
  ::-ms-input-placeholder {
    color: ${({ theme }) => theme.primary()};
    font-size: 0.8rem;
  }
  ::placeholder {
    color: ${({ theme }) => theme.primary()};
    font-size: 0.8rem;
  }
`;

export const Input = (props) => {
  const { type, value, onChange, ...rest } = props;
  const change = useCallback(e => onChange && onChange(e.target.value), [onChange]);

  return(
    <StyledInput type={type} value={value} onChange={change} {...rest} />
  );
};

export const NumberInput = props =>
  <Input type='number' {...props} />;

export const TextInput = props =>
  <Input type='text' {...props} />;

export default Input;
