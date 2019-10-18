import React, { useCallback } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr'; // the locale you want

import { locale } from 'utils/date';

registerLocale(locale, fr); // register it with the name you want

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
  width: 70px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid silver;
  line-height: 16px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary()};

  &:focus{
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.primary()};
  }
`;

const DatePickerComponent = props => {
  const { selected, onChange, arabic, placeholderText } = props;

  const change = useCallback(
    onChange ? date => onChange(date) : null,
    [onChange]
  );

  return (
    <StyledDatePicker
      dateFormat="dd/MM/yyyy"
      locale={locale}
      showPopperArrow={false}
      placeholderText={placeholderText || 'select a date'}
      popperPlacement={arabic ? 'bottom-end' : 'bottom-start'}
      selected={selected}
      {...props}
      onChange={change}
    />
  );
}

export default DatePickerComponent;
