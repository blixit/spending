import React, { createContext } from 'react';

import { ThemeProvider } from 'styled-components';

// https://coolors.co/36453b-596869-515751-f5f9e9-c2c1a5
const theme1 = {
  colors: {
    primary: '#36453B',
    secondary: '#596869',
    third: '#515751',
    fourth: '#F5F9E9', // isabelline
    fifth: '#C2C1A5',
  },
  texts: {
    primary: '#F5F9E9',
    secondary: '#596869',
    third: '#515751',
    fourth: '#F5F9E9', // isabelline
    fifth: '#C2C1A5',
  }
};

export const ContextValue = ({ colors, texts }) => ({
  primary: () => colors.primary,
  secondary: () => colors.secondary,
  third: () => colors.third,
  fourth: () => colors.fourth,
  fifth: () => colors.fifth,
  text: {
    primary: () => texts.primary,
    secondary: () => texts.secondary,
    third: () => texts.third,
    fourth: () => texts.fourth,
    fifth: () => texts.fifth,
  }
});

export const defaultTheme = ContextValue(theme1);

export const ThemeContext = createContext(defaultTheme);

export default ({ children, theme }) =>
  <ThemeProvider theme={theme || defaultTheme} >{children}</ThemeProvider>;
