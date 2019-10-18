import moment from 'moment';

export const locale = 'fr-FR';

const getDate = date =>
  moment(date)
  .format(process.env.REACT_APP_FORMATS_DATE);

const getTime = date =>
  moment(date)
  .format(process.env.REACT_APP_FORMATS_TIME);

/**
 * Formats a date for the backend.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 * @param {Date} date the date to convert
 */
export const toBackendDate = date => {
  return date
    ? (getDate(date) + ' ' + getTime(date))
    : date;
};

export const strToDatetime = toFormat => {
  const date = new Date(toFormat);
  return toBackendDate(date);
};
