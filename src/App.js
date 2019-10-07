import React from 'react';

import ThemeProvider from 'core/theming/theme';
import { EventProvider } from 'core/events/provider';

import RoutedApp from './components/menu/RoutedApp';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <RoutedApp />
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;
