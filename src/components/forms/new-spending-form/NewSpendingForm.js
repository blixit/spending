import React from 'react';
import styled from 'styled-components';
import trigger from 'vanillajs-browser-helpers/trigger';

import { mutate, ReadyMutations as Mutations } from 'core/http/query';
import { clean as cleanForm } from 'utils/form';
import { toBackendDate } from 'utils/date';

import Selector from 'components/inputs/selector/Selector';
import DatePickerComponent from 'components/inputs/date-picker/DatePicker';
import {
  NumberInput as NumberInputComponent,
  TextInput
} from 'components/inputs/input/Input';
import ThemedButton from 'components/atoms/buttons/ThemedButton';
import StyledError from 'components/molecules/error/Error';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const NumberInput = styled(NumberInputComponent)`
  width: 30%;
`;

const DatePicker = styled(DatePickerComponent)`
  margin-left: 10px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 auto;
`;

class NewSpendingForm extends React.Component {
  categories = [
    'Restauration',
    'Taxis'
  ];
  state = {
    category: '',
    date: new Date(),
    price: null,
    name: 'My depense',
    hasError: false,
    errors: {}
  };

  onCategorySelected = (e) => {
    const category = e.target.value;
    this.setState({ category });
  };
  
  onDateChanged = (date) => this.setState({ date });
  
  onPriceChanged = (price) => this.setState({ price });
  
  onNameChanged = (name) => this.setState({ name });

  onSubmit = async (e) => {
    e.preventDefault();

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
      trigger(document, 'refresh:balance', response);
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
        <Block>
          Category
          <Selector
            color='primary'
            values={this.categories}
            onChange={this.onCategorySelected}
          />
        </Block>
        <Block>
          Date
          <DatePicker popperPlacement="left-start" selected={date} onChange={this.onDateChanged} />
        </Block>
        <Block>
          Price
          <NumberInput value={price} onChange={this.onPriceChanged} />
        </Block>
        <Block>
          Name
          <TextInput value={name} onChange={this.onNameChanged} />
        </Block>
        <br />
        <ThemedButton color='primary' onClick={this.onSubmit}>Ajouter</ThemedButton>
        {hasError && <StyledError>{errors.global}</StyledError>}
      </Form>
    );
  }
}

export default NewSpendingForm;
