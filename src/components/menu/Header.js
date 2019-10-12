import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { EventContext } from 'core/events/provider';
import { query, ReadyQueries as Queries } from 'core/http/query';
import { hydrate, use } from 'core/hocs/query-wrapper';

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

  const [balance, setBalance] = useState(
    props.balance ? props.balance.data.data : {}
  );
  const { balance: getBalance } = Queries.account;

  useEffect(() => {
    // setting up event listeners
    eventManager.on('refresh:balance', async (e) => {
      const response = await query({ ...getBalance });
      setBalance(response.data.data);
      Header.handling = false;
    });

    return () => {
      // cleaning up
      eventManager.removeAllListeners('refresh:balance', _ => {});
    };
  }, [eventManager, getBalance]);

  const UserIcon = AppIcons.user;

  return (
    <TopBar>
      <BarItem first >
        <AppName>Depenses</AppName>
      </BarItem>
      <BarItem id='balance'>
        {balance.value} {balance.devise}
      </BarItem>
      <BarItem last >
        <UserMenu>
          <UserIcon />
        </UserMenu>
      </BarItem>
    </TopBar>
  );
}

export default hydrate(
  Header,
  use(Queries.account.balance, 'balance')
);
