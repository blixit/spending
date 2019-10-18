import React from 'react';

import render from 'testing/render';

import IconButton from './IconButton';

describe('[atoms/buttons] IconButton', () => {
  const props = {
    icon: {
      type: 'trash',
      color: 'red'
    },
    children: 'button text'
  };
  it('should render properly', () => {
    const tree = render(<IconButton {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('has the right iconThemedColor', () => {
    const tree = render(<IconButton {...props} />);
    const svg = tree.root.findByType('svg');
    expect(svg.props.style).toEqual({ color: props.icon.color})
  });
});
