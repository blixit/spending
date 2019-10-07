import React, { createContext } from 'react';
import EventEmitter from 'events';

const defaultValue = {
  emitter: new EventEmitter()
};

export const EventContext = createContext(defaultValue);

export const EventProvider = ({ children }) => (
  <EventContext.Provider value={defaultValue}>
    {children}
  </EventContext.Provider>
);
export const EventConsumer = EventContext.Consumer;
