import React from 'react';
import styled from 'styled-components';

import ButtonComponent from './button/Button';

const Button = styled(ButtonComponent)`
  border: 0;
  border-radius: 3px;
  outline: none;
  &:hover{
    box-shadow: 1px 1px 3px 1px silver;
  }
  background-color: ${({ theme, color }) => color ? theme[color]() : '' }
  color: ${({ theme, color }) => color ? theme.text[color]() : '' }
`;

const ThemedButton = props => <Button {...props} />;

export default ThemedButton;
