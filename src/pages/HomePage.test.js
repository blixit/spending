import 'jest-localstorage-mock';
import { act } from 'react-test-renderer';

import render from 'testing/render';

import { withTheme } from 'ui/theming/test.utils';

import SpendingListItem from 'components/items/spending-list-item/SpendingListItem';


import { HomePage } from './HomePage';

describe('[pages] HomePage', () => {
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
    const tree = render(withTheme(HomePage, { items }));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render items when provided', () => {
    const tree = render(withTheme(HomePage, { items }));
    const listItems = tree.root.findAllByType(SpendingListItem);
    expect(listItems).toHaveLength(items.data.data.length);
  });

  it('change state when toggleFilter is called', () => {
    const tree = render(withTheme(HomePage, { items }));
    const page = tree.root.findByType(HomePage);
    
    const instance = page.instance;
    act(() => {
      instance.toggleFilter();
    });
    tree.update(withTheme(HomePage, { items }));
    expect(instance.state.showFilter).toBe(true);
    act(() => {
      instance.toggleFilter();
    });
    expect(instance.state.showFilter).toBe(false);
  });
});
