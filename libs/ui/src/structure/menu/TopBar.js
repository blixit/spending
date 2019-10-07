import React from 'react';
import styled from 'styled-components';

const TopBarUI = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.third() };
  z-index: 10;
  position: fixed;
  width: 100%;
`;

const TopBar = props => <TopBarUI {...props} />;

TopBar.displayName = 'TopBar';

export default TopBar;
