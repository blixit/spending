import React from 'react';

import ThemeProvider from './theme';

export const withTheme = (children) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);
