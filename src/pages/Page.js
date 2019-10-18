import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorBoundary from 'ui/structure/boundary/ErrorBoundary';
import { readCache } from 'core/storage/cache';

const StyledPage = styled.div`
  position: fixed;
  top: 50px;
  bottom: 60px;
  left: 0;
  right: 0;
  overflow-y: auto;
  width: 100%;
  background: ${({ theme }) => theme.fourth()};
  color: ${({ theme }) => theme.primary()};
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default props => {
  const { router, children, ...rest } = props;
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    const user = readCache('user');
    if (!user && router && router.location.pathname !== '/login') {
      const { history } = router;
      
      // redirect to home
      history.push('/login');
      console.log('redirect to login');
      
      return;
    }

    setCanRender(true);
  }, [router]);
  return (
    <ErrorBoundary>
      <StyledPage {...rest}>
        {canRender && <Wrapper>{children}</Wrapper>}
      </StyledPage>
    </ErrorBoundary>
  );
};
