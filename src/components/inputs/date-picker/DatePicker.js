import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function DatePickerComponent (props) {
  const { onChange } = props;

  return (
    <DatePicker selected={props.selected} onChange={onChange} {...props} />
  );
}

export default DatePickerComponent;
