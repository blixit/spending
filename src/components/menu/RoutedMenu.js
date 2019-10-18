import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import Menu from 'ui/structure/menu/TabsMenu';
import getMenuItem from 'ui/structure/menu/TabsMenuItem';

import { readCache } from 'core/storage/cache';
import { EventContext } from 'core/events/provider';

export const PATHS = {
  new: 'new',
  statistiques: 'statistiques',
  admin: 'admin'
};

const Nomenu = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.fourth()};
  height: 60px;
`;

const RoutedMenu = ({ location }) => {
  const { pathname: page } = location;
  const { eventManager } = useContext(EventContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = readCache('user');
    setUser(user);

    eventManager.on('refresh:activeUser', async (e) => {
      console.log('user refreshed', e);
      setUser(e);
    });

    return () => {
      // cleaning up
      eventManager.removeAllListeners('refresh:activeUser', _ => {});
    };
  }, [eventManager]);

  const MenuItem = getMenuItem({ Link });

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

  if (!user) {
    return (
      <Menu>
        <Nomenu />
      </Menu>
    );
  }

  return <Content />;
};

export default withRouter(RoutedMenu);
