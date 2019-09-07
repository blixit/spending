import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import on from 'vanillajs-browser-helpers/on';
import off from 'vanillajs-browser-helpers/off';

import { Get, query, ReadyQueries as Queries } from 'core/http/query';

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.third() };
  z-index: 10;
  position: fixed;
  width: 100%;
`;

const BarItem = styled.span`
  text-align: center;
  height: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.fourth() }
  font-size: ${({ first }) => first ? '1.55em' : '1em'};
  padding-left: ${({ first }) => first ? '10px' : 0 };
  padding-right: ${({ last }) => last ? '10px' : 0 };
`;

const Header = (props) => {
  const [balance, setBalance] = useState({});
  useEffect(() => {
    // setting up
    on(document, 'refresh:balance', async (e) => {
      const { balance: getBalance } = Queries.account;

      const response = await query({ ...getBalance });
      setBalance(response.data.data);
      Header.handling = false;
    });

    return () => {
      // cleaning up
      off(document, 'refresh:balance', _ => console.log('demounted'));
    };
  }, []);

  const updateBalance = ({ status, data: { data: balance } }) => {
    setBalance(balance);
    return balance;
  };

  return (
    <TopBar>
      <BarItem first >Depenses</BarItem>
      <BarItem id='balance'>
        <Get
          {...Queries.account.balance}
          children={updateBalance}
        />
        {balance.value} {balance.devise}
      </BarItem>
      <BarItem last >Account</BarItem>
    </TopBar>
  );
}

export default Header;
