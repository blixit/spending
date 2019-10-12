import React from 'react';
import styled from 'styled-components';
import { EventContext } from 'core/events/provider';

import { mutate, ReadyMutations as Mutations } from 'core/http/query';
import { clean as cleanForm } from 'utils/form';
import { toBackendDate } from 'utils/date';

import FormDate from 'ui/forms/form-date/FormDate';
import FormInput from 'ui/forms/form-input/FormInput';
import FormSelector from 'ui/forms/form-selector/FormSelector';
import ThemedButton from 'ui/atoms/buttons/ThemedButton';
import StyledError from 'components/molecules/error/Error';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

class NewSpendingForm extends React.Component {
  static contextType = EventContext;

  categories = [
    { id: 1, option: 'Restauration' },
    { id: 2, option: 'Taxis' }
  ];
  state = {
    category: '',
    date: new Date(),
    price: null,
    name: 'My depense',
    hasError: false,
    errors: {}
  };

  onCategorySelected = e => {
    const category = e.target.value;
    this.setState({ category });
  };
  
  onDateChanged = date => this.setState({ date });
  
  onPriceChanged = price => this.setState({ price });
  
  onNameChanged = name => this.setState({ name });

  onSubmit = async e => {
    e.preventDefault();

    const { eventManager } = this.context;
    const { errors } = this.state;
    const { onFormResult } = this.props;
    const { add } = Mutations.spending;

    const body = cleanForm(this.state, ['hasError', 'errors']);

    try {
      const response = await mutate({
        ...add,
        data: {
          ...body,
          date: toBackendDate(body.date)
        }
      });
      onFormResult && onFormResult(response);
      this.setState({ hasError: false });
      eventManager.emit('refresh:balance', response);
    } catch (e) {
      const { message } = e.response.data || {};
      errors.global = message || add.queryError || e.message;
      this.setState({ hasError: true, errors });
    }
  };
  
  render () {
    const { date, price, name, hasError, errors } = this.state;
    const { onFormResult, ...rest } = this.props;
    return (
      <Form {...rest}>
        <FormDate
          label='Date'
          selected={date}
          onChange={this.onDateChanged}
        />
        <FormInput
            type='number'
            label='Amount'
            placeholder='Ex: -45 for -45€'
            value={price}
            onChange={this.onPriceChanged}
          />
        <FormInput
          type='text'
          label='Name'
          value={name}
          onChange={this.onNameChanged}
        />
        <FormSelector
          label='Category'
          color='primary'
          values={this.categories}
          onChange={this.onCategorySelected}
        />
        <br />
        <ThemedButton bgcolor='primary' onClick={this.onSubmit}>Ajouter</ThemedButton>
        {hasError && <StyledError>{errors.global}</StyledError>}
      </Form>
    );
  }
}

export default NewSpendingForm;
