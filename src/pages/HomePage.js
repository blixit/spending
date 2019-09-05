import React from 'react';
import styled from 'styled-components';

import Button from 'components/atoms/buttons/Button';
import FilterForm from 'components/forms/filter-form/FilterForm';

import { Get, ReadyQueries as Queries } from 'core/http/query';

import PageComponent from 'pages/Page';

const Page = styled(PageComponent)`
  flex-direction: column;
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

class HomePage extends React.Component {
  static displayName = 'HomePage';

  state = {
    showFilter: false,
    items: []
  };

  toggleFilter = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  }

  renderItem = (item) => {
    return (
      <Item key={`${item.id}`}>
        <span>{item.label}</span>
        <span>{item.price} €</span>
      </Item>
    );
  }

  renderItems = (data) => {
    const items = data.map(
      (item) => this.renderItem(item)
    );
    return items;
  }

  updateItems = ({ status, data: { data: items } }) => {
    this.setState({ items });
  }

  render () {
    const { showFilter, items } = this.state;
    const { ...rest } = this.props;

    return (
      <Page {...rest}>
        <React.Fragment>
          <Button onClick={this.toggleFilter}>Recherche avancée</Button>
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
