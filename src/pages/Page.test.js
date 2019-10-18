import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import Page from './Page';

describe('[pages] Pages', () => {
  it('should render properly', () => {
    const tree = render(withTheme(Page, { children: 'Test'}));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
