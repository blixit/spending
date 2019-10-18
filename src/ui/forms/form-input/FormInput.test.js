import render from 'testing/render';

import { withTheme } from 'ui/theming/test.utils';

import FormInput from './FormInput';

describe('[forms/form-input] FormInput', () => {
  it('renders properly', () => {
    const props = {
      label: 'Label',
      type: 'text',
      onChange: jest.fn()
    };
    const tree = render(withTheme(FormInput, props));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
