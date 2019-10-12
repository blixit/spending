import React from 'react';

import render from 'testing/render';

import BasicList from './BasicList';

describe('[collection/list] BasicList', () => {
  const size = 5;
  const items = (new Array(size)).fill(0).map((x, id) => ({ id: id * 2 }));

  const renderList = () => (
    <div>
      <BasicList items={items} >
        {(item, id) => <span key={id}>Test {id}</span>}
      </BasicList>
    </div>
  );

  it('renders properly', () => {
    const tree = render(renderList());
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the right number of items', () => {
    const tree = render(renderList());
    const spans = tree.root.findAllByType('span');
    expect(spans).toHaveLength(size);
  })
});
