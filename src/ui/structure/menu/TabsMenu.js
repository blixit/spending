import React from 'react';
import styled from 'styled-components';

const TabsMenuUI = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 10;
`;

const TabsMenu = props => <TabsMenuUI {...props} />;

TabsMenu.displayName = 'TabsMenu';

export default TabsMenu;
