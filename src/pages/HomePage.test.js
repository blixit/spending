import React from 'react';
import { act } from 'react-test-renderer';

import ThemeProvider from 'core/theming/theme';
import { withTheme } from 'core/theming/test.utils';

import SpendingListItem from 'components/items/spending-list-item/SpendingListItem';

import render from 'testing/render';

import { HomePage } from './HomePage';

describe('[pages] HomePage', () => {
  const getInstance = (tree) => tree.root
    .findByType(ThemeProvider)
    .children[0].children[0];
  const items = {
    data: {
      data: [{
        id: 27,
        label: 'My depense',
        price: 45,
        date: '2019-09-25T23:38:53+02:00'
      }]
    }
  };

  it('should render properly', () => {
    const tree = render(withTheme(<HomePage items={items} />));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render items when provided', () => {
    const tree = render(withTheme(<HomePage items={items} />));
    const listItems = tree.root.findAllByType(SpendingListItem);
    expect(listItems).toHaveLength(items.data.data.length);
  });

  it('change state when toggleFilter is called', () => {
    const tree = render(withTheme(<HomePage />));
    
    let homepage = getInstance(tree);
    act(() => {
      homepage.instance.toggleFilter();
    });
    tree.update(withTheme(<HomePage />));
    expect(homepage.instance.state.showFilter).toBe(true);

    act(() => {
      homepage.instance.toggleFilter();
    });
    expect(homepage.instance.state.showFilter).toBe(false);
  });
});
