import React from 'react';

import render from 'testing/render';

import App from './App';

describe('[App]', () => {
  it('renders properly', () => {
    const app = render(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });
});
