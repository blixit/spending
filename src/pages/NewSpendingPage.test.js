import React from 'react';

import render from 'testing/render';

import NewSpendingPage from './NewSpendingPage';

describe('[pages] NewSpendingPage', () => {
  it('should render properly', () => {
    const tree = render(<NewSpendingPage>Test</NewSpendingPage>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
