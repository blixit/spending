import React from 'react';
import styled from 'styled-components';

import { guessTextColor } from 'ui/theming/theme';

import ButtonComponent from './button/Button';

const Button = styled(ButtonComponent)`
  border: 0;
  border-radius: 3px;
  outline: none;
  &:hover{
    box-shadow: 1px 1px 3px 1px silver;
  }
  background-color: ${({ theme, bgcolor }) => {
    if (!bgcolor) { return ''; }
    return theme[bgcolor] ? theme[bgcolor]() : bgcolor;
  }};
  color: ${props => guessTextColor(props)};
`;

const ThemedButton = props => <Button {...props} />;

ThemedButton.displayName = 'ThemedButton';

export default ThemedButton;
