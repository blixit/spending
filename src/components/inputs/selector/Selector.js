import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  min-height: 25px;
  lineheight: 25px;
  font-size: 16px;
`;

function Selector (props) {
  const { values, onChange } = props;
  return (
    <StyledSelect onChange={onChange} {...props}>
      {values.map(
        value => (<option key={String(value)}>{value}</option>)
      )}
    </StyledSelect>
  );
}

export default Selector;
