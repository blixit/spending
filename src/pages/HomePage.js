import React from 'react';
import styled from 'styled-components';

import { EventContext } from 'core/events/provider';

import ThemedButton from 'components/atoms/buttons/ThemedButton';
import FilterForm from 'components/forms/filter-form/FilterForm';
import List from 'components/items/list/List';
import SpendingListItem from 'components/items/spending-list-item/SpendingListItem';

import {
  hydrate, use,
  ReadyQueries as Queries,
  mutate,
  ReadyMutations as Mutations,
} from 'core/http/query';

import PageComponent from 'pages/Page';

const Page = styled(PageComponent)`
  flex-direction: column;
`;

const StyledFilterForm = styled(FilterForm)`
  margin-top: ${({ showFilter }) => showFilter ? '20px' : 0 };
  margin-bottom: 20px;
`;

export class HomePage extends React.Component {
  static displayName = 'HomePage';

  static contextType = EventContext;

  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      items: props.items ? props.items.data.data : []
    };
  }

  toggleFilter = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

  onRemoveItem = ({ id }) => {
    const { items } = this.state;
    const { emitter } = this.context;
    const { remove } = Mutations.spending;

    mutate({ ...remove, data: {
      id
    }}).then(data => {
      const filtered = items.filter(item => item.id !== id);
      this.setState({ items: filtered });
      emitter.emit('refresh:balance', data);
    }).catch(error => {
      console.error(error);
    });
  };

  updateItems = ({ status, data: { data: items } }) =>
    this.setState({ items });

  render () {
    const { showFilter, items } = this.state;
    const { ...rest } = this.props;

    return (
      <Page {...rest}>
        <ThemedButton color='primary' onClick={this.toggleFilter}>Recherche avancée</ThemedButton>
        {showFilter && <StyledFilterForm
          showFilter={showFilter}
          onFormResult={this.updateItems}
        />}
        <List items={items} >
          {(item, key) =>
            <SpendingListItem
              item={item}
              key={key}
              onDelete={this.onRemoveItem}
          />}
        </List>
      </Page>
    );
  }
}

export default hydrate(
  HomePage,
  use(Queries.test, 'items')
);
