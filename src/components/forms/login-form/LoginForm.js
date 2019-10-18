import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import ThemedButton from 'ui/atoms/buttons/ThemedButton';
import FormInput from 'ui/forms/form-input/FormInput';

import { EventContext } from 'core/events/provider';
import { ReadyMutations as Mutations } from 'core/http/query';
import { writeCache } from 'core/storage/cache';

import StyledError from 'components/molecules/error/Error';

const H1 = styled.h1`
  text-align: center;
  font-weight: bold;
`;

const LoginButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  flex: auto;
  border-radius: 3px;
  padding: 10px;
`;

const LoginForm = props => {
  const context = useContext(EventContext);

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(null);

  const { router } = props;
  const { eventManager } = context;

  const onLoginChanged = useCallback(login => setLogin(login), []);
  const onPasswordChanged = useCallback(password => setPassword(password), []);
  const onSubmit = useCallback(async e => {
    e.preventDefault();
    setHasError(false);

    const { login: loginQuery } = Mutations.auth;
    const data = { login, password };

    try {
      writeCache('user', data);
      eventManager.emit('refresh:activeUser', data);

      router.history.push('/');
      // const response = await mutate({ ...loginQuery, data });
    } catch (e) {
      errors.global = loginQuery.queryError || e.message;
      setHasError(true);
      setErrors(errors);
    }
  }, [errors, login, password, eventManager, router]);


  return (
    <Container {...props} >
      <H1>Your workspace</H1>
      <FormInput
        type='text'
        label='Login'
        placeholder='Enter your login'
        value={login}
        onChange={onLoginChanged}
      />
      <FormInput
        type='password'
        label='Password'
        placeholder='Enter your password'
        value={password}
        onChange={onPasswordChanged}
      />
      <LoginButton>
        <ThemedButton bgcolor='primary' onClick={onSubmit}>Log in</ThemedButton>
      </LoginButton>
      {hasError && <StyledError>{errors.global}</StyledError>}
    </Container>
  )
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
