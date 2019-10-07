export const dateOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
};
export const timeOptions = {
  timeZone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

export const locale = 'fr-FR';

const getDate = (date) =>
  date.toLocaleDateString(locale, dateOptions);

const getTime = (date) =>
  date.toLocaleTimeString(locale, timeOptions);

/**
 * Formats a date for the backend.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 * @param {Date} date the date to convert
 */
export const toBackendDate = (date) => {
  return date
    ? (getDate(date) + ' ' + getTime(date))
    : date;
};


export const strToDatetime = (toFormat) => {
  
  const date = new Date(toFormat);
  return toBackendDate(date);
};