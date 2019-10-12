import React from 'react';
import styled from 'styled-components';

import DatePickerUI from 'ui/inputs/date-picker/DatePicker';
import LabelUI from 'ui/forms/form-label/FormLabel';

const ErrorText = styled.div`
  color: red;
`;

const Label = styled(LabelUI)`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    text-align: ${({ arabic }) => arabic ? 'right' : 'left'};
    height: 20px;
    lineheight: 18px;
  }
`;

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const FormDate = ({ label, error, selected, type, onChange, arabic, ...rest }) => {
  const dateProps = { selected, type, onChange, arabic, ...rest };
  return (
    <Container {...rest} >
      <Label arabic={arabic}>
        <span>{label}</span>
        <DatePickerUI {...dateProps} />
      </Label>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
};

FormDate.displayName = 'FormDate';

export default FormDate;
