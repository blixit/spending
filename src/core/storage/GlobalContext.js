import React, { createContext } from 'react';

const storage = {
  money: {
  }
};

export const GlobalContext = createContext(storage);