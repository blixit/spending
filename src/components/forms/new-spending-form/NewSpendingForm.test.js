import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import NewSpendingForm from './NewSpendingForm';

describe('[components/forms/filter-form] NewSpendingForm', () => {
  it('should render properly', () => {
    const newSpendingForm = render(withTheme(NewSpendingForm, {}));
    expect(newSpendingForm.toJSON()).toMatchSnapshot();
  });
});
