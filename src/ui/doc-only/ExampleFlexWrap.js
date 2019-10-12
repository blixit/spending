import React from 'react';
import styled from 'styled-components';

import ThemeProvider from 'theming/theme';

import Wrapper from './Wrapper';

const WrapperUI = styled(Wrapper)`
  display: flex;
`;

const ExampleFlexWrap = ({ children, ...rest }) => (
  <ThemeProvider>
    <WrapperUI {...rest}>
        {children}
    </WrapperUI>
  </ThemeProvider>
);

ExampleFlexWrap.displayName = 'ExampleFlexWrap';

export default ExampleFlexWrap;
