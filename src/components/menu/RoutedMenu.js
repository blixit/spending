import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 10;
`;

const MenuItem = styled(Link)`
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

export const PATHS = {
  new: 'new',
  statistiques: 'statistiques',
  admin: 'admin'
};

const RoutedMenu = ({ location }) => {
  const { pathname: page } = location;
  

  const Content = useCallback(_ => {
    return (
      <Menu>
        <MenuItem
          iscurrentpage={String(page === '/')}
          to='/'
        >Dépenses</MenuItem>
        <MenuItem
          iscurrentpage={String(page === '/' + PATHS.new)}
          to={`/${PATHS.new}`}
        >Nouvelle dépense</MenuItem>
        <MenuItem
          iscurrentpage={String(page === '/' + PATHS.statistiques)}
          to={`/${PATHS.statistiques}`}
        >Statistiques</MenuItem>
        <MenuItem
          iscurrentpage={String(page === '/' + PATHS.admin)}
          to={`/${PATHS.admin}`}
        >Admin</MenuItem>
      </Menu>
    )
  }, [page]);

  return <Content />;
};

export default withRouter(RoutedMenu);
