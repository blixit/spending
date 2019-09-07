import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from 'core/ErrorBoundary';

const StyledPage = styled.div`
  position: fixed;
  top: 50px;
  bottom: 60px;
  left: 0;
  right: 0;
  overflow-y: auto;
  width: 100%;
  background: ${({ theme }) => theme.fourth() };
  color: ${({ theme }) => theme.primary() };
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default (props) => {
  const { children, ...rest} = props;
  return (
    <ErrorBoundary>
      <StyledPage {...rest}>
        <Wrapper>{children}</Wrapper>
      </StyledPage>
    </ErrorBoundary>
  );
};
