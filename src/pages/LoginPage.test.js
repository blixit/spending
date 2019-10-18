import 'jest-localstorage-mock';

import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import { LoginPage } from './LoginPage';

describe('[pages] LoginPage', () => {
  it('should render properly', () => {
    const tree = render(withTheme(LoginPage));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
