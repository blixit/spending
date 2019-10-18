import React from 'react';

import render from 'testing/render';

import Button from './Button';

describe('[atoms/buttons/button] Button', () => {
  it('should render properly', () => {
    const tree = render(<Button />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
