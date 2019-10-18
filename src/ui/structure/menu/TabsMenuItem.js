import React from 'react';
import styled from 'styled-components';

const getMenuItem = ({ Link }) => {
  const TabsMenuItemUI = styled(Link)`
    padding: 10px;
    flex: 0 1 25%;
    text-align: center;
    text-decoration: none;
    font-size: 0.95em;
    color: grey;
    background-color: ${({ theme, iscurrentpage }) =>
      iscurrentpage === 'true' ? theme.primary() : theme.fifth()
    };
    height: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

  const TabsMenu = props => <TabsMenuItemUI {...props} />;

  TabsMenu.displayName = 'TabsMenu';

  return TabsMenu;
}

export default getMenuItem;