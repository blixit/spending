import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import LoginForm from './LoginForm';

describe('[components/forms/filter-form] LoginForm', () => {
  it('should render properly', () => {
    const loginForm = render(withTheme(LoginForm, {}));
    expect(loginForm.toJSON()).toMatchSnapshot();
  });
});
