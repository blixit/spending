import React from 'react';

import Query from 'core/http/query';


export const QueriesContext = React.createContext({
  queries: {}
});

/**
 * Tells the systems to read the result of the query as the content of 'as'
 * For instance, in the example below:
 * use(Query.search, 'apiResults');
 * you should understand:
 * "use query.search result as 'apiResults'"
 * @param {*} query 
 * @param {*} as 
 */
export const use = (query, as) => ({ query, as });

/**
 * Hydrates a component with the result of the given query
 * @param {Function} component The component to hydrate
 * @param {object} param1 
 */
export const hydrate = (component, { as, query }) => {
  return class extends React.Component {
    /** Used to identify each request */
    static identifier = component.displayName + '.' + as;
    /** The component name is forwarded to each created subcomponent */
    static displayName = component.displayName;
    /** The context we use to store the queries */
    static contextType = QueriesContext;

    state = {
      data: null,
      identifier: this.constructor.identifier,
      displayName: component.displayName
    };

    componentDidMount() {
      const { identifier } = this.state;
      this.context.queries = {
        ...this.context.queries,
        [identifier]: { component, as , query }
      }
    }

    /**
     * Creates a props object containing the result of the request
     * with the name provided in 'as'
     */
    buildProps = data => ({ [as]: data });

    /**
     * Updates the data and writes into the right query container props
     * @param {object} data The result of the request
     */
    onResult = data => {
      const { identifier } = this.state;
      const { [identifier]: queryContainer } = this.context.queries;

      this.context.queries[identifier] = {
        ...queryContainer,
        props: this.buildProps(data),
        identifier
      };

      this.setState({ data });
    };

    /**
     * Accumulates all the props into a single object.
     * If 2 properties have the same, the first will be overrided.
     */
    mergedProps = () => {
      return Object.keys(this.context.queries)
        .reduce((acc, identifier) => {
          const { [identifier]: queryContainer } = this.context.queries;
          return { ...acc, ...queryContainer.props};
        }, {});
    }

    render() {
      const { data } = this.state;
      const Child = component;

      return (
        <>
          <Query {...query} method='get' onResult={this.onResult} />
          {data && <Child {...this.mergedProps()} />}
        </>
      );
    }
  };
};

/**
 * Composes many queries in the reverse order they came and
 * builds the given component with the result of each queries.
 * It's a composition of hydratations.
 * @param  {...any} composedQueries 
 */
export const compose = (...composedQueries) => {
  return component => class extends React.Component {
    render() {
      const ResultedComponent = (composedQueries || [])
      .reverse()
      .filter(cq => cq != null)
      .reduce((Acc, composedQuery) => {
        return !Acc
          ? hydrate(component, composedQuery)
          : hydrate(Acc, composedQuery);
      }, null);
      return (<ResultedComponent />)
    }
  };
};
