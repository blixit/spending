import React from 'react';
import styled from 'styled-components';
import trigger from 'vanillajs-browser-helpers/trigger';
import { FaTrash } from 'react-icons/fa';

import ThemedButton from 'components/atoms/buttons/ThemedButton';
import FilterForm from 'components/forms/filter-form/FilterForm';

import {
  Get,
  ReadyQueries as Queries,
  mutate,
  ReadyMutations as Mutations
} from 'core/http/query';

import PageComponent from 'pages/Page';

const Page = styled(PageComponent)`
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 1.3em;
`;

const Price = styled.span`
  font-size: 1.215em;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.2em;
  border-bottom: 1px solid silver;
`;

const StyledFilterForm = styled(FilterForm)`
  margin-top: ${({ showFilter }) => showFilter ? '20px' : 0 };
  margin-bottom: 20px;
`;

const Trash = styled(FaTrash)`
  margin-left: 10px;
  cursor: ${({ onClick }) => onClick ? 'pointer' : 'default' };
`;

class HomePage extends React.Component {
  static displayName = 'HomePage';

  state = {
    showFilter: true,
    items: []
  };

  toggleFilter = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

  formatDate = (date) => {
    const toFormat = new Date(date);
    return toFormat.toLocaleString();
  };

  onTrashClicked = ({ id }) => {
    const { items } = this.state;
    const { remove } = Mutations.spending;
    mutate({ ...remove, data: {
      id
    }}).then(data => {
      const filtered = items.filter(item => item.id !== id);
      this.setState({ items: filtered });
      trigger(document, 'refresh:balance', data);
    }).catch(error => {
      console.error(error);
    });
  };

  renderItem = (item) => {
    const { id, label, date, price } = item;
    return (
      <Item key={`${id}`}>
        <div>
          <Label>{label}</Label><br />
          <span>{this.formatDate(date)}</span>
        </div>
        <div>
          <Price>{price} €</Price>
          <Trash onClick={() => this.onTrashClicked(item)} />
        </div>
      </Item>
    );
  };

  renderItems = (data) => {
    return (data || []).map(
      (item) => this.renderItem(item)
    );
  };

  updateItems = ({ status, data: { data: items } }) => {
    this.setState({ items });
  };

  render () {
    const { showFilter, items } = this.state;
    const { ...rest } = this.props;

    return (
      <Page {...rest}>
        <React.Fragment>
          <ThemedButton color='primary' onClick={this.toggleFilter}>Recherche avancée</ThemedButton>
          {showFilter && <StyledFilterForm
            showFilter={showFilter}
            onFormResult={this.updateItems}
          />}
        </React.Fragment>

        <Get
          {...Queries.test}
          children={this.updateItems}
        />
        {this.renderItems(items)}
      </Page>
    );
  }
}

export default HomePage;
