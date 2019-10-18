import API from './api-settings';

const MutationsConfiguration = config => {
  const { base } = config || {};
  const url = base || API.base;

  return {
    auth: {
      login: {
        url: url + '/auth/login',
        queryError: 'Login failed. Please check your credentials or retry later',
        method: 'post'
      }
    },
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
      },
      remove: {
        url: url + '/spending/delete',
        queryError: 'We failed to remove the entry',
        method: 'post'
      }
    }
  };
};

export default MutationsConfiguration;
