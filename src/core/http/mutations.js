import API from './api-settings';

const MutationsConfiguration = (config) => {
  const { base } = config || {};
  const url = base || API.base;

  return {
    spending: {
      search: {
        url: url + '/spending/search',
        queryError: 'We failed to find new spendings',
        method: 'post'
      },
      add: {
        url: url + '/spending/add',
        queryError: 'We failed to store the new entry',
        method: 'post'
      }
    }
  };
};

export default MutationsConfiguration;
