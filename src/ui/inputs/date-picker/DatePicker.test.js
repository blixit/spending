import render from 'testing/render';

import { withTheme } from 'ui/theming/test.utils';

import DatePicker from './DatePicker';

describe('[inputs/date-picker] DatePicker', () => {
  it('renders properly', () => {
    const props = {
      onChange: jest.fn(),
      placeholderText: 'select the date',
      selected: Date.UTC(2019, 1, 17)
    };
    const tree = render(withTheme(DatePicker, props));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
