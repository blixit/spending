import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import NewSpendingPage from './NewSpendingPage';

describe('[pages] NewSpendingPage', () => {
  it('should render properly', () => {
    const tree = render(withTheme(NewSpendingPage, { children: 'Test'}));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
