import React from 'react';
import 'jest-styled-components';

import render from 'testing/render';

import FormLabel from './FormLabel';

describe('[forms/form-label] FormLabel', () => {
  it('renders properly', () => {
    const tree = render(
      <FormLabel arabic >Label</FormLabel>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('checks the arabic props', () => {
    const tree = render(
      <FormLabel arabic >Label</FormLabel>
    ).toJSON();
    expect(tree).toHaveStyleRule('text-align', 'right');
  });
});
