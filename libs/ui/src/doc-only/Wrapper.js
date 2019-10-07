import React from 'react';
import ThemeProvider from 'theming/theme';

const Wrapper = ({ children, ...rest }) => (
  <ThemeProvider {...rest} >
    {children}
  </ThemeProvider>
);

Wrapper.displayName = 'Wrapper';

export default Wrapper;
