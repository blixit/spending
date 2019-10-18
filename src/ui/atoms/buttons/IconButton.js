import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AppIcons from 'ui/atoms/icons/AppIcons';
import { guessTextColor } from 'ui/theming/theme';

import ButtonComponent from './ThemedButton';

const Button = styled(ButtonComponent)`
  svg {
    fill: ${({ iconThemedColor: color, theme }) => guessTextColor({ color, theme })};
  }
`;

const iconStyle = {
};

const IconButton = props => {
  const { icon, children, ...rest } = props;
  const { type, color } = icon;
  const Icon = type ? AppIcons[type] : null;

  return (
    <Button iconThemedColor={color} {...rest} >
      {Icon && <Icon color={color} style={iconStyle} />}
    </Button>
  );
};

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  /** Describes the Icon to use */
  icon: PropTypes.shape({
    /** Icon type. See FontAwesome names */
    type: PropTypes.string,
    /** Color which fills the icon */
    color: PropTypes.string
  }).isRequired
};

export default IconButton;
