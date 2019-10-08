import React from 'react';
import styled from 'styled-components';

import AppIcons from 'ui/atoms/icons/AppIcons';
import { guessTextColor } from 'ui/theming/theme';

import ButtonComponent from './ThemedButton';

const Button = styled(ButtonComponent)`
  display: flex;

  svg {
    fill: ${({ iconThemedColor: color, theme }) => guessTextColor({ color, theme })};
  }

  span {
    margin-left: 3px;
  }
`;

const IconButton = props => {
  const { icon, children, theme, ...rest } = props;
  const { type, color } = icon;
  const Icon = AppIcons[type];

  return (
    <Button iconThemedColor={color} {...rest} >
      <Icon color={color} />
      {children && <span>{children}</span>}
    </Button>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
