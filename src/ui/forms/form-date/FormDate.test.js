import render from 'testing/render';

import { withTheme } from 'ui/theming/test.utils';

import FormDate from './FormDate';

describe('[forms/form-date] FormDate', () => {
  it('renders properly', () => {
    const props = {
      label: 'Label',
      type: 'text',
      onChange: jest.fn(),
      placeholderText: 'select the date',
      selected: Date.UTC(2019, 1, 17)
    };
    const tree = render(withTheme(FormDate, props));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
