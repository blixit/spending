import React from 'react';
import styled from 'styled-components';

const BarItemUI = styled.span`
  flex: 1 0 33%;
  text-align: center;
  height: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.fourth() };
  font-size: ${({ first }) => first ? '1.48em' : '1em'};
  padding-left: ${({ first }) => first ? '10px' : 0 };
  padding-right: ${({ last }) => last ? '10px' : 0 };
`;

const BarItem = (props) => <BarItemUI {...props} />;

BarItem.displayName = 'BarItem';

export default BarItem;
