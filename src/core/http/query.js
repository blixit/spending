import axios from 'axios';

import QueriesConfiguration from './queries';
import MutationsConfiguration from './mutations';

export const query = ({ method, url, data }) =>
  axios({ method: method || 'get', url, data });

export const mutate = ({ method, url, data }) =>
  axios({ method: method || 'post', url, data });

export const Queries = config => QueriesConfiguration(config);
export const ReadyQueries = (_ => QueriesConfiguration())();

export const Mutations = config => MutationsConfiguration(config);
export const ReadyMutations = (_ => MutationsConfiguration())();
