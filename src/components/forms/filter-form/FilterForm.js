import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { mutate, ReadyMutations as Mutations } from 'core/http/query';
import { toBackendDate } from 'utils/date';

import ThemedButton from 'ui/atoms/buttons/ThemedButton';

import StyledError from 'components/molecules/error/Error';
import FormInput from 'ui/forms/form-input/FormInput';
import FormDate from 'ui/forms/form-date/FormDate';
import FormSelector from 'ui/forms/form-selector/FormSelector';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormNumberInput = styled(FormInput)`
  max-width: 150px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: auto;
`;

class FilterForm extends React.Component {
  static propTypes = {
    onFormResult: PropTypes.func
  };

  categories = [
    { id: 1, option: 'Restauration' },
    { id: 2, option: 'Taxis' }
  ];

  constructor (props) {
    super(props);
    const now = new Date();
    const before = new Date(new Date().setMonth(now.getMonth() - 1));
    this.state = {
      category: '',
      dateStart: before,
      dateEnd: now,
      minPrice: undefined,
      maxPrice: undefined,
      name: undefined,
      hasError: false,
      errors: {}
    };
  }

  onCategorySelected = e => this.setState({ category: e.target.value });

  onDateStartChanged = dateStart => this.setState({ dateStart });

  onDateEndChanged = dateEnd => this.setState({ dateEnd });

  onPriceMinChanged = minPrice => this.setState({ minPrice });

  onPriceMaxChanged = maxPrice => this.setState({ maxPrice });
  
  onNameChanged = name => this.setState({ name });

  onSubmit = async e => {
    e.preventDefault();

    const { errors, dateStart, dateEnd, ...rest } = this.state;
    const { onFormResult } = this.props;
    const { search } = Mutations.spending;

    const body = {
      ...rest,
      dateStart: toBackendDate(dateStart),
      dateEnd: toBackendDate(dateEnd)
    };

    try {
      const response = await mutate({ ...search, data: body });
      onFormResult && onFormResult(response);
      this.setState({ hasError: false });
    } catch (e) {
      errors.global = search.queryError || e.message;
      this.setState({ hasError: true, errors });
    }
  };

  render() {
    const { dateStart, dateEnd, minPrice, maxPrice, name, hasError, errors } = this.state;
    const { onFormResult, ...rest } = this.props;

    return (
      <Form {...rest}>
        <Block>
          <FormDate
            label='From'
            selected={dateStart}
            onChange={this.onDateStartChanged}
          />
          <FormDate arabic
            label='To'
            selected={dateEnd}
            onChange={this.onDateEndChanged}
          />
        </Block>
        <Block>
          <FormNumberInput
            type='number'
            label='Min amount'
            placeholder='Ex: -45 for -45€'
            value={minPrice}
            onChange={this.onPriceMinChanged}
          />
          <FormNumberInput arabic
            type='number'
            label='Max amount'
            placeholder='Ex: 45 for 45€'
            value={maxPrice}
            onChange={this.onPriceMaxChanged}
          />
        </Block>
        <FormInput
          type='text'
          label='Name'
          value={name}
          onChange={this.onNameChanged}
        />
        <FormSelector
          label='Category'
          color='primary'
          // style={{ width: '80%' }}
          values={this.categories}
          onChange={this.onCategorySelected}
        />
        <br />
        <ThemedButton bgcolor='primary' onClick={this.onSubmit}>Filtrer</ThemedButton>
        {hasError && <StyledError>{errors.global}</StyledError>}
      </Form>
    );
  }
}

export default FilterForm;
