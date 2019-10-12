import React from 'react';

import BasicList from 'ui/collection/list/BasicList';

const VerticalList = ({ items, renderItem, ...rest }) => {
  return (
    <div {...rest} >
      <BasicList items={items} >
        {(item, key) => renderItem(item, key)}
      </BasicList>
    </div>
  );
};

export default VerticalList;
