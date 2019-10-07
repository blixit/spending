import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { EventContext } from 'core/events/provider';
import { query, hydrate, use, ReadyQueries as Queries } from 'core/http/query';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.third() };
  z-index: 10;
  position: fixed;
  width: 100%;
`;

const BarItem = styled.span`
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
