import React from 'react';
import styled from 'styled-components';

import { EventContext } from 'core/events/provider';

import IconButtonUI from 'ui/atoms/buttons/IconButton';
import FilterForm from 'components/forms/filter-form/FilterForm';
import VerticalList from 'ui/collection/vertical-list/VerticalList';
import SpendingListItem from 'components/items/spending-list-item/SpendingListItem';

import {
  ReadyQueries as Queries,
  mutate,
  ReadyMutations as Mutations,
} from 'core/http/query';
import { hydrate, use } from 'core/hocs/query-wrapper';

import PageComponent from 'pages/Page';

const IconButton = styled(IconButtonUI)`
  width: 24px;
`;

const Page = styled(PageComponent)`
  flex-direction: column;
`;

const StyledFilterForm = styled(FilterForm)`
  margin-top: ${({ showFilter }) => showFilter ? '5px' : 0 };
`;

const ListTitle = styled.span`
  font-weight: bold;
  padding-top: 10px;
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
    const { eventManager } = this.context;
    const { remove } = Mutations.spending;

    mutate({ ...remove, data: {
      id
    }}).then(data => {
      const filtered = items.filter(item => item.id !== id);
      this.setState({ items: filtered });
      eventManager.emit('refresh:balance', data);
    }).catch(error => {
      console.error(error);
    });
  };

  updateItems = ({ status, data: { data: items } }) =>
    this.setState({ items });

  renderItem = (item, key) => (
    <SpendingListItem
      item={item}
      key={key}
      onDelete={this.onRemoveItem}
    />
  );

  render () {
    const { showFilter, items } = this.state;
    
    const icon = {
      type: showFilter ? 'times' : 'filter',
      color: 'white'
    };

    return (
      <Page {...this.props}>
        <IconButton icon={icon} bgcolor='primary' onClick={this.toggleFilter}>Recherche avancée</IconButton>
        {showFilter && <StyledFilterForm
          showFilter={showFilter}
          onFormResult={this.updateItems}
        />}
        <ListTitle>Your depenses:</ListTitle>
        <VerticalList
          items={items}
          renderItem={this.renderItem}
        />
      </Page>
    );
  }
}

export default hydrate(
  HomePage,
  use(Queries.test, 'items')
);
