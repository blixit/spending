import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import ChartFilterForm from './ChartFilterForm';

describe('[components/forms/filter-form] ChartFilterForm', () => {
  const props = {
    onRefresh: jest.fn(),
    refreshQuery: jest.fn()
  };

  it('should render properly', () => {
    const chartFilterForm = render(withTheme(ChartFilterForm, props));
    expect(chartFilterForm.toJSON()).toMatchSnapshot();
  });
});
