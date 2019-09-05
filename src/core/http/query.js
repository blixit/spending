import React from 'react';
import axios from 'axios';

import QueriesConfiguration from './queries';
import MutationsConfiguration from './mutations';

import StyledError from 'components/molecules/error/Error';

export const query = ({ method, url, data }) =>
  axios({ method: method || 'get', url, data });

export const mutate = ({ method, url, data }) =>
  axios({ method: method || 'post', url, data });

export const Queries = config => QueriesConfiguration(config);
export const ReadyQueries = (_ => QueriesConfiguration())();

export const Mutations = config => MutationsConfiguration(config);
export const ReadyMutations = (_ => MutationsConfiguration())();

class Query extends React.Component {
  state = {
    onError: false 
  };

  constructor(props) {
    super(props);
    const { sync } = props;

    if (sync) {
      this.synchronizedQuery();
    } else {
      this.asynchronizedQuery();
    }
  }

  asynchronizedQuery = () => {
    const { method, url } = this.props;
    query({ method, url })
      .then(this.then)
      .catch(this.catch);
  }

  synchronizedQuery = async () => {
    const { method, url } = this.props;

    try {
      const result = method && url && await query({ method, url });
      this.then(result);
    } catch (e) {
      this.catch(e);
    }
  }

  then = (response) => {
    const { children } = this.props;
    children(response);
  }

  catch = (response) => {
    this.setState({ response, onError: true });
  };

  renderError = () => {
    const { response } = this.state;
    const { queryError } = this.props;

    return (
      <StyledError>{queryError || response.message}</StyledError>
    );
  }

  render() {
    const { onError } = this.state;

    const Error = this.renderError;

    return (
      <React.Fragment>
        {onError && <Error />}
      </React.Fragment>
    )
  }
}

export const Get = ({ children, ...rest }) =>
  <Query {...rest} method='get' >{children}</Query>;

export default Query;
