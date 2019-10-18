import React from 'react';

import render from 'testing/render';

import Page from './Page';

describe('[pages] Pages', () => {
  it('should render properly', () => {
    const tree = render(<Page>Test</Page>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
