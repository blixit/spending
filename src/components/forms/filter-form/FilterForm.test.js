import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import FilterForm from './FilterForm';

describe('[components/forms/filter-form] FilterForm', () => {
  it('should render properly', () => {
    const filterForm = render(withTheme(FilterForm, {}));
    expect(filterForm.toJSON()).toMatchSnapshot();
  });
});
