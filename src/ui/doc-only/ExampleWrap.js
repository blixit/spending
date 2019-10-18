import React from 'react';
import styled, { css } from 'styled-components';

import ThemeProvider from 'theming/theme';

const itemSpacing = (inline) =>
  inline
    ? css`
      left: -5px;
      margin-bottom: -10px;

      & > * {
        margin-left: 5px !important;
        margin-right: 5px !important;
        margin-bottom: 10px !important;
        display: inline-block;
        vertical-align: top;
      }
    `
    : css`
      & > * {
        margin-top: 10px !important;

        &:first-child {
          margin-top: 0 !important;
        }
      }
    `;

const WrapperUI = styled.div`
  position: relative;
  ${({ inline }) => itemSpacing(inline)};
`;

const ExampleWrap = ({ children, ...rest }) => (
  <ThemeProvider>
    <WrapperUI {...rest}>
        {children}
    </WrapperUI>
  </ThemeProvider>
);

ExampleWrap.displayName = 'ExampleWrap';

export default ExampleWrap;
