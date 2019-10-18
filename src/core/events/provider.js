import React, { createContext } from 'react';
import EventEmitter from 'events';

/**
 * Facade to prevent coupling with this library
 */
class Emitter extends EventEmitter {
  emit = (message, data) => super.emit(message, data);
  on = (message, callback) => super.on(message, callback);
  removeAllListeners = (message, callback) =>
    super.removeAllListeners(message, callback);
};

const defaultValue = {
  eventManager: new Emitter()
};

export const EventContext = createContext(defaultValue);

export const EventProvider = ({ children }) => (
  <EventContext.Provider value={defaultValue}>
    {children}
  </EventContext.Provider>
);
export const EventConsumer = EventContext.Consumer;
