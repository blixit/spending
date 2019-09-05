import React from 'react';
import styled from 'styled-components';
import trigger from 'vanillajs-browser-helpers/trigger';

import { mutate, ReadyMutations as Mutations } from 'core/http/query';

import Selector from 'components/inputs/selector/Selector';
import DatePicker from 'components/inputs/date-picker/DatePicker';
import { NumberInput, TextInput } from 'components/inputs/input/Input';
import Button from 'components/atoms/buttons/Button';
import StyledError from 'components/molecules/error/Error';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

class NewSpendingForm extends React.Component {
  categories = [
    'Restauration',
    'Taxis'
  ];
  state = {
    category: '',
    date: new Date(),
    price: 0,
    name: 'My depense',
    hasError: false,
    errors: {}
  };

  onCategorySelected = (e) => {
    const category = e.target.value;
    this.setState({ category });
  }
  
  onDateChanged = (date) => this.setState({ date });
  
  onPriceChanged = (price) => this.setState({ price });
  
  onNameChanged = (name) => this.setState({ name });

  onSubmit = async (e) => {
    e.preventDefault();

    const { errors } = this.state;
    const { onFormResult } = this.props;
    const { add } = Mutations.spending;

    try {
      const response = await mutate({ ...add, data: this.state });
      onFormResult && onFormResult(response);
      this.setState({ hasError: false });
      console.log('mutation done');
      trigger(document, 'refresh:balance', response);
    } catch (e) {
      errors.global = add.queryError || e.message;
      this.setState({ hasError: true, errors });
    }
  }
  
  render () {
    const { date, price, name, hasError, errors } = this.state;
    const { onFormResult, ...rest } = this.props;
    return (
      <Form {...rest}>
        Category
        <Selector
          values={this.categories}
          onChange={this.onCategorySelected}
        />
        Date
        <DatePicker selected={date} onChange={this.onDateChanged} />
        Price
        <NumberInput value={price} onChange={this.onPriceChanged} />
        Name
        <TextInput value={name} onChange={this.onNameChanged} />
        <br />
        <Button onClick={this.onSubmit}>Ajouter</Button>
        {hasError && <StyledError>{errors.global}</StyledError>}
      </Form>
    );
  }
}

export default NewSpendingForm;
