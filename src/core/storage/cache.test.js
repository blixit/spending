import 'jest-localstorage-mock';

import { parse, stringify } from 'utils/parser';

import { getPrefix, writeCache, readCache } from './cache';

describe('[core/storage/cache] cache', () => {
  describe('getPrefix', () => {
    const prefix = getPrefix();
    expect(prefix).toContain(process.env.REACT_APP_CACHE_PREFIX);
    expect(prefix).toMatchSnapshot();
  });

  describe('write/read data', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it.each([
      'value',
      15,
      { id: 15},
      ['array']
    ])('should writes the local storage properly', (value) => {
      writeCache('test-key', value);
      const expectedValue = parse(localStorage.getItem(getPrefix() + 'test-key'));
      expect(expectedValue).toEqual(value);
    });
  
    it.each([
      'value',
      15,
      { id: 15},
      ['array']
    ])('should reads the local storage properly', (value) => {
      localStorage.setItem(getPrefix() + 'test-key', stringify(value));
      const expectedValue = readCache('test-key');
      expect(expectedValue).toEqual(value);
    });
  });
});
