import packageJson from 'package.alias.json';
import { parse, stringify } from 'utils/parser';


export const getPrefix = () => {
  // app prefix from env
  const prefix = process.env.REACT_APP_CACHE_PREFIX;

  // app version from package.json
  return prefix + packageJson.version + '_';
};

export const writeCache = (key, value, options) => {
  const cacheKey = getPrefix() + key;
  localStorage.setItem(cacheKey, stringify(value));
};

export const readCache = (key) => {
  const cacheKey = getPrefix() + key;
  return parse(localStorage.getItem(cacheKey));
};
