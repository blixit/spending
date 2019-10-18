import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { EventContext } from 'core/events/provider';
import { query, ReadyQueries as Queries } from 'core/http/query';
import { hydrate, use } from 'core/hocs/query-wrapper';
import { readCache } from 'core/storage/cache';

import TopBar from 'ui/structure/menu/TopBar';
import BarItem from 'ui/structure/menu/BarItem';
import AppIcons from 'ui/atoms/icons/AppIcons';

const AppName = styled.div`
  left: 20px;
  position: absolute;
`;

const UserMenu = styled.div`
  right: 20px;
  position: absolute;
  border: 1px solid white;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  padding: 1px;

  svg {
    height: 25px;
  }
`;

const Header = props => {
  const { eventManager } = useContext(EventContext);

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(
    props.balance ? props.balance.data.data : {}
  );
  const { balance: getBalance } = Queries.account;

  useEffect(() => {
    const user = readCache('user');
    setUser(user);

    // setting up event listeners
    eventManager.on('refresh:balance', async (e) => {
      const response = await query({ ...getBalance });
      setBalance(response.data.data);
      Header.handling = false;
    });
    eventManager.on('refresh:activeUser', async (e) => {
      console.log('user refreshed', e);
      setUser(e);
    });

    return () => {
      // cleaning up
      eventManager.removeAllListeners('refresh:balance', _ => {});
      eventManager.removeAllListeners('refresh:activeUser', _ => {});
    };
  }, [eventManager, getBalance]);

  const UserIcon = AppIcons.user;

  return (
    <TopBar>
      <BarItem first >
        <AppName>Depenses</AppName>
      </BarItem>
      {user && <BarItem id='balance'>
        {balance.value} {balance.devise}
      </BarItem>}
      {user && <BarItem last >
        <UserMenu>
          <UserIcon />
        </UserMenu>
      </BarItem>}
    </TopBar>
  );
}

export default hydrate(
  Header,
  use(Queries.account.balance, 'balance')
);
