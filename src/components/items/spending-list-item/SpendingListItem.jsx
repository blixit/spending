import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

import { strToDatetime } from 'utils/date';

const Label = styled.span`
`;
const Date = styled.span`
  font-size: 0.7rem;
  font-style: italic;
`;

const Price = styled.span`
  font-size: 1.15rem;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.white()}
  font-size: 1.2em;
`;

const Trash = styled(FaTrash)`
  margin-left: 10px;
  cursor: ${({ onClick }) => onClick ? 'pointer' : 'default' };
`;


const SpendingListItem = ({ item, onDelete }) => {
  const { label, date, price } = item;

  const onDeleteItem = useCallback(() => {
    onDelete && onDelete(item);
  }, [item, onDelete]);

  return (
    <Item>
      <div>
        <Label>{label}</Label><br />
        <Date>{strToDatetime(date)}</Date>
      </div>
      <PriceContainer>
        <Price>{price} €</Price>
        <Trash onClick={onDeleteItem} />
      </PriceContainer>
    </Item>
  );
};

export default SpendingListItem;
