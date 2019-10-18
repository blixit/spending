import React, { useCallback, useContext, useEffect, useState } from 'react';

import { query as doQuery } from 'core/http/query';

import StyledError from 'components/molecules/error/Error';

export const QueriesContext = React.createContext({
  queries: {}
});

/**
 * Tells the systems to read the result of the query as the content of 'as'
 * For instance, in the example below:
 * use(Query.search, 'apiResults');
 * you should understand:
 * "use query.search result as 'apiResults'"
 * @param {object} query 
 * @param {object} as 
 */
export const use = (query, as) => ({ query, as });

/**
 * HOC that hydrates the given component with the query
 * @param {object} props 
 */
const Hydrater = ({ component, as, query }) => {
  /** The context we use to store the queries */
  const context = useContext(QueriesContext);

  /** Used to identify each request */
  const [identifier] = useState(component.displayName + '.' + as);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const Child = component;
  const Error = useCallback(() => {
    return  <StyledError>{query.queryError || error.message}</StyledError>;
  }, [query, error]);

  /**
   * Accumulates all the props into a single object.
   * If 2 properties have the same, the first will be overrided.
   */
  const mergedProps = useCallback(() => {
    return Object.keys(context.queries)
      .reduce((acc, identifier) => {
        const { [identifier]: queryContainer } = context.queries;
        return { ...acc, ...queryContainer.props};
      }, {});
  }, [context]);

  /**
   * Updates the data and writes into the right query container props
   * @param {object} data The result of the request
   */
  const onResult = useCallback(data => {
    const { [identifier]: queryContainer } = context.queries;

    context.queries[identifier] = {
      ...queryContainer,
      /**
       * Creates a props object containing the result of the request
       * with the name provided in 'as'
       */
      props: { [as]: data },
      identifier
    };

    setData(data);
  }, [identifier, context, as]);

  useEffect(() => {
    // adds current query to the context
    context.queries = {
      ...context.queries,
      [identifier]: { component, as , query }
    };
    // executes the query
    doQuery(query).then(
      onResult,
      error => setError(error)
    );
  }, [identifier, component, as, query, context, onResult]);

  return (
    <>
      {data && <Child {...mergedProps()} />}
      {error && <Error />}
    </>
  );
};

/**
 * Hydrates a component with the result of the given query
 * @param {Function} component The component to hydrate
 * @param {object} param1 
 */
export const hydrate = (component, { as, query }) => {
  const config = { component, as, query };

  const Component = props => <Hydrater {...config} {...props} />;
  /** The component name is forwarded to each created subcomponent */
  Component.displayName = component.displayName;

  return Component;
};

/**
 * Composes many queries in the reverse order they came and
 * builds the given component with the result of each queries.
 * It's a composition of hydratations.
 * @param  {...any} composedQueries 
 */
export const compose = (...composedQueries) => {
  return component => () => {
    const ResultedComponent = (composedQueries || [])
    .reverse()
    .filter(cq => cq != null)
    .reduce((Acc, composedQuery) => {
      return !Acc
        ? hydrate(component, composedQuery)
        : hydrate(Acc, composedQuery);
    }, null);
    return <ResultedComponent />;
  };
};
