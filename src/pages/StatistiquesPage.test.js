import { withTheme } from 'ui/theming/test.utils';

import render from 'testing/render';

import { StatistiquesPage } from './StatistiquesPage';

describe('[pages] StatistiquesPage', () => {
  const items = {
    data: {
      data: []
    }
  };
  it('should render properly', () => {
    const tree = render(withTheme(StatistiquesPage, { items } ));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
