import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  min-height: 25px;
  lineheight: 25px;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
`;

class Button extends React.Component {
  render() {
    return (
      <StyledButton {...(this.props)} />
    );
  }
}

export default Button;
