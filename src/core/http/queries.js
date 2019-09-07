import API from './api-settings';

const QueriesConfiguration = (config) => {
  const { base } = config || {};
  const url = base || API.base;

  return {
    test: {
      url: url + '/test',
      sync: true,
      queryError: 'We failed to get data'
    },
    spending: {
      latests: {
        url: url + '/test',
        sync: true,
        queryError: 'We failed to get data'
      }
    },
    account: {
      balance: {
        url: url + '/account/balance',
        sync: true,
        queryError: 'We failed to get the balance'
      },
    }
  };
};

export default QueriesConfiguration;
