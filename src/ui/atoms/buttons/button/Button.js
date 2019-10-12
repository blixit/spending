import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  min-height: 24px;
  lineheight: 25px;
  padding: 5px;
  cursor: pointer;
`;

const Button = props => <StyledButton {...props} />;

Button.displayName = 'Button';

export default Button;
