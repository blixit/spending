import React from 'react';
import styled from 'styled-components';

import PageUI from 'pages/Page';

import LoginForm from 'components/forms/login-form/LoginForm';

const Page = styled(PageUI)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginPage = props => {
  const { router } = props;
  return (
    <Page {...props} >
      <LoginForm router={router} ></LoginForm>
    </Page>
  )
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
