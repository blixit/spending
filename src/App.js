import React from 'react';

import ThemeProvider from 'core/theming/theme';

import RoutedApp from './components/menu/RoutedApp';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <RoutedApp />
    </ThemeProvider>
  );
}

export default App;
