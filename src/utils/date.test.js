import { toBackendDate, strToDatetime } from './date';

describe('[utils] date', () => {
  describe('toBackendDate', () => {
    it.each([
      undefined,
      null,
      false
    ])('should return the parameter if falsy', (date) => {
      const formatted = toBackendDate(date);
      expect(formatted).toBe(date);
    });
    it.each([
      new Date(Date.UTC(96, 1, 2, 3, 4, 5))
    ])('should return the formatted date', (date) => {
      const formatted = toBackendDate(date);
      expect(formatted).toBe('1996-02-02 03:04:05');
    });
  });
  describe.only('strToDatetime', () => {
    it.each([
      '1996-02-02T23:38:53+02:00',
    ])('should return the formatted date for the user', (date) => {
      const formatted = strToDatetime(date);
      expect(formatted).toBe('1996-02-02 21:38:53');
    });
  });
});
