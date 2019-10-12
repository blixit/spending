import React from 'react';

import render from 'testing/render';

import Selector from './Selector';

describe('[inputs/selector] Selector', () => {
  const options = [{
    id: 1,
    option: 'item 1'
  }];
  it('renders properly', () => {
    const tree = render(
      <Selector
        label='Label'
        onChange={jest.fn()}
        values={options}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
