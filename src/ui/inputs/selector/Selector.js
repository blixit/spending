import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  min-height: 30px;
  lineheight: 25px;
  font-size: 0.8rem;
  border: 1px solid silver;
  border-radius: 3px;
  background-color: transparent;

  &:focus{
    outline: none;
    border: 1px solid ${({ theme, color }) => color ? theme[color]() : '' }
    background-color: ${({ theme, color }) => color ? theme[color]() : '' }
    color: ${({ theme, color }) => color ? theme.text[color]() : '' }  
  }
`;

function Selector (props) {
  const { values, selected, ...rest } = props;
  return (
    <StyledSelect value={selected} {...rest}>
      {values.map(
        ({ id, option }) => (<option key={id}>{option}</option>)
      )}
    </StyledSelect>
  );
}

export default Selector;
