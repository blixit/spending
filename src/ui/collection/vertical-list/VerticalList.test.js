import React from 'react';

import render from 'testing/render';

import VerticalList from './VerticalList';

describe('[collection/vertical-list] VerticalList', () => {
  it('renders properly', () => {
    const props = {
      items: [{
        id: 1,
        label: 'label'
      }],
      renderItem: (item, key) => (
        <div key={key}>Item content</div>
      )
    };
    const tree = render(<VerticalList {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
