import React from 'react';

import { withTheme } from 'ui/theming/test.utils';
import render from 'testing/render';

import Input, { NumberInput, TextInput } from './Input';

describe('[inputs/input] Inputs', () => {
  describe('[inputs/input] NumberInput', () => {
    it('should render properly', () => {
      const tree = render(withTheme(NumberInput, { value: 'test' }));
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
