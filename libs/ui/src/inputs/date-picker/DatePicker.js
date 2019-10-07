import React from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr'; // the locale you want

registerLocale('fr', fr); // register it with the name you want

/**
 * https://github.com/Hacker0x01/react-datepicker/issues/635
 *
 * export const popperPlacementPositions = [
  'auto',
  'auto-left',
  'auto-right',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start'
]
 */
const StyledDatePicker = styled(DatePicker)`
  height: 30px;
  width: 80px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid silver;
  line-height: 16px;
  font-size: 16px;
  &:focus{
    outline: none;
  }
`;

function DatePickerComponent (props) {
  const { onChange } = props;

  function change(date) {
    console.log({ date });

    // onChange(date.toLocaleDateString() + ' ' + date.toLocaleTimeString());
    onChange(date);
  };

  return (
    <StyledDatePicker
      dateFormat="dd/MM/yyyy"
      locale='fr'
      selected={props.selected}
      {...props}
      onChange={change}
    />
  );
}

export default DatePickerComponent;
