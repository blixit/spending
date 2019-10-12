import 'jest-styled-components'

import render from 'testing/render';

import { withTheme } from 'ui/theming/test.utils';
import ThemedButton from './ThemedButton';

describe('[atoms/buttons] ThemedButton', () => {
  const props = {
    bgcolor: 'yellow',
    children: 'button text'
  };

  it('should render properly', () => {
    const tree = render(withTheme(ThemedButton, props));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
