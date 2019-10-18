import React from 'react';

import render from 'testing/render';

import StatistiquesPage from './StatistiquesPage';

describe('[pages] StatistiquesPage', () => {
  it('should render properly', () => {
    const tree = render(<StatistiquesPage>Test</StatistiquesPage>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
