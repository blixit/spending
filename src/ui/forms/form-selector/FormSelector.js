import React from 'react';
import styled from 'styled-components';

import Selector from 'ui/inputs/selector/Selector';
import Label from 'ui/forms/form-label/FormLabel';

const ErrorText = styled.div`
  color: red;
`;

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const FormSeletor = ({ label, error, onChange, arabic, values, ...rest }) => {
  const selectorProps = { onChange, arabic, values, ...rest };
  return (
    <Container {...rest} >
      <Label arabic={arabic}>
        <span>{label}</span>
        <Selector {...selectorProps} />
      </Label>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
};

FormSeletor.displayName = 'FormSeletor';

export default FormSeletor;
