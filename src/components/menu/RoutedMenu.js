import React, { useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Menu from 'ui/structure/menu/TabsMenu';
import getMenuItem from 'ui/structure/menu/TabsMenuItem';

export const PATHS = {
  new: 'new',
  statistiques: 'statistiques',
  admin: 'admin'
};

const RoutedMenu = ({ location }) => {
  const { pathname: page } = location;

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

  return <Content />;
};

export default withRouter(RoutedMenu);
