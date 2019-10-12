import React from 'react';

import render from 'testing/render';

import FormSelector from './FormSelector';

describe('[forms/form-selector] FormSelector', () => {
  const options = [{
    id: 1,
    option: 'item 1'
  }];
  it('renders properly', () => {
    const tree = render(
      <FormSelector
        label='Label'
        onChange={jest.fn()}
        values={options}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
