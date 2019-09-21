/**
 * Formats a date for the backend
 * @param {Date} date the date to convert
 */
export const toBackendDate = (date) => {
  return date
    ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    : date;
};