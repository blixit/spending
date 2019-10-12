import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  min-height: 25px;
  lineheight: 25px;
  font-size: 0.8rem;
  border: 0;
  border-bottom: 1px solid silver;
  padding-right: 5px;
  padding-left: 5px;
  background: transparent;
  color: ${({ theme }) => theme.primary()};

  &:focus{
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary()};
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

export const NumberInput = (props) => {
  const localProps = {
    ...props,
    type: 'number'
  };
  return <Input {...localProps} />;
};

export const TextInput = (props) => {
  const localProps = {
    ...props,
    type: 'text'
  };
  return <Input {...localProps} />;
};

export default Input;
