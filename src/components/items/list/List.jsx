import { useCallback } from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const { items, children: renderItem } = props;
  
  const renderedItems = useCallback(() => {
    return (items || []).map(
      (item) => renderItem({ ...item}, item.id)
    );
  }, [items, renderItem]);

  return renderedItems();
};

List.displayName = 'List';

List.propsType = {
  items: PropTypes.array
};

export default List;
