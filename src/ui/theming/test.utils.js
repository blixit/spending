import React from 'react';

import Provider from './theme';

export const withTheme = (Child, props) => {
  return (
    <Provider>
      <Child {...props} />
    </Provider>
  );
}
