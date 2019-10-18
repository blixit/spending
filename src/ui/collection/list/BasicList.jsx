import { useCallback } from 'react';
import PropTypes from 'prop-types';

const BasicList = props => {
  const { items, children: renderItem } = props;
  
  const renderedItems = useCallback(() => {
    return (items || []).map(
      item => renderItem(item, item.id)
    );
  }, [items, renderItem]);

  return renderedItems();
};

BasicList.displayName = 'BasicList';

BasicList.propsType = {
  items: PropTypes.array
};

export default BasicList;
