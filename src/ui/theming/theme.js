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
  },
  // to change following the wanted theme
  guessed: {
    primary: '#F5F9E9',
    secondary: '#C2C1A5',
    third: '#C2C1A5',
    fourth: '#36453B',
    fifth: '#36453B',
  }
};

export const ContextValue = ({ colors, texts, guessed }) => ({
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
  },
  textColor: bgColor => guessed[bgColor] ? guessed[bgColor] : bgColor
});

export const guessTextColor = ({ theme, color, bgcolor }) => {
  if (!theme) { return ''; }
  
  if (color) {
    return theme[color] ? theme[color]() : color;
  }

  if (bgcolor) {
    return theme.textColor(bgcolor);
  }

  return '';
};

export const defaultTheme = ContextValue(theme1);

export const ThemeContext = createContext(defaultTheme);

export default ({ children, theme }) =>
  <ThemeProvider theme={theme || defaultTheme} >{children}</ThemeProvider>;
