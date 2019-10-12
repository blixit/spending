import React, { useContext, useEffect, useState } from 'react';

import { EventContext } from 'core/events/provider';
import { query, hydrate, use, ReadyQueries as Queries } from 'core/http/query';

import TopBar from 'ui/structure/menu/TopBar';
import BarItem from 'ui/structure/menu/BarItem';

const Header = (props) => {
  const { emitter } = useContext(EventContext);

  const [balance, setBalance] = useState(
    props.balance ? props.balance.data.data : {}
  );
  const { balance: getBalance } = Queries.account;

  useEffect(() => {
    // setting up event listeners
    emitter.on('refresh:balance', async (e) => {
      const response = await query({ ...getBalance });
      setBalance(response.data.data);
      Header.handling = false;
    });

    return () => {
      // cleaning up
      emitter.removeAllListeners('refresh:balance', _ => console.log('demounted'));
    };
  }, [emitter, getBalance]);

  return (
    <TopBar>
      <BarItem first >Depenses</BarItem>
      <BarItem id='balance'>
        {balance.value} {balance.devise}
      </BarItem>
      <BarItem last >Account</BarItem>
    </TopBar>
  );
}

export default hydrate(
  Header,
  use(Queries.account.balance, 'balance')
);
