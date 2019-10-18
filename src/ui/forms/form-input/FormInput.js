import React from 'react';
import styled from 'styled-components';

import { Input } from 'ui/inputs/input/Input';
import Label from 'ui/forms/form-label/FormLabel';

const ErrorText = styled.div`
  color: red;
`;

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const FormInput = ({ label, error, type, onChange, arabic, ...rest }) => {
  const inputProps = { type, onChange, arabic, ...rest };
  return (
    <Container {...rest} >
      <Label arabic={arabic}>
        <span>{label}</span>
        <Input {...inputProps} />
      </Label>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
};

FormInput.displayName = 'FormInput';

export default FormInput;
