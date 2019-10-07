import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

import { strToDatetime } from 'utils/date';

const Label = styled.span`
  font-size: 1.3em;
`;

const Price = styled.span`
  font-size: 1.215em;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.2em;
  border-bottom: 1px solid silver;
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
        <span>{strToDatetime(date)}</span>
      </div>
      <div>
        <Price>{price} €</Price>
        <Trash onClick={onDeleteItem} />
      </div>
    </Item>
  );
};

export default SpendingListItem;
