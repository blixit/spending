import React from 'react';
import styled from 'styled-components';

import ButtonComponent from './Button';

const Button = styled(ButtonComponent)`
  border: 0;
  border-radius: 3px;
  outline: none;
  &:hover{
    box-shadow: 1px 1px 10px 1px silver;
  }
  background-color: ${({ theme, color }) => color ? theme[color]() : '' }
  color: ${({ theme, color }) => color ? theme.text[color]() : '' }
`;

const ThemedButton = (props) => {

  return (
    <Button {...props} />
  );
}

export default ThemedButton;
