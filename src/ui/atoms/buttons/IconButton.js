import React from 'react';
import styled from 'styled-components';

import AppIcons from 'ui/atoms/icons/AppIcons';
import { guessTextColor } from 'ui/theming/theme';

import ButtonComponent from './ThemedButton';

const Button = styled(ButtonComponent)`
  svg {
    fill: ${({ iconThemedColor: color, theme }) => guessTextColor({ color, theme })};
  }
`;

const iconStyle = {
  // position: 'absolute',
  // top: '5px'
};

const IconButton = props => {
  const { icon, children, ...rest } = props;
  const { type, color } = icon;
  const Icon = AppIcons[type];

  return (
    <Button iconThemedColor={color} {...rest} >
      <Icon color={color} style={iconStyle} />
    </Button>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
