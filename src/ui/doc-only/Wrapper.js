import React from 'react';

import ThemeProvider from 'theming/theme';

const Wrapper = ({ children, ...rest }) => (
  <ThemeProvider>
    <div {...rest} >
      {children}
    </div>
  </ThemeProvider>
);

Wrapper.displayName = 'Wrapper';

export default Wrapper;
