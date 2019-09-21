import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { mutate, ReadyMutations as Mutations } from 'core/http/query';
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
const InlineBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

class FilterForm extends React.Component {
  static propTypes = {
    onFormResult: PropTypes.func
  };

  categories = [
    'Restauration',
    'Taxis'
  ];

  constructor (props) {
    super(props);
    const now = new Date();
    const before = new Date(new Date().setMonth(now.getMonth() - 1));
    this.state = {
      category: '',
      dateStart: before,
      dateEnd: now,
      minPrice: null,
      maxPrice: null,
      name: null,
      hasError: false,
      errors: {}
    };
  }

  onCategorySelected = (e) => {
    const category = e.target.value;
    this.setState({ category });
  };

  onDateChanged = (date, start) => {
    if (start) this.setState({ dateStart: date });
    else this.setState({ dateEnd: date });
  };

  onPriceChanged = (value, min) => {
    if (min) this.setState({ minPrice: value });
    else this.setState({ maxPrice: value });
  };
  
  onNameChanged = (name) => this.setState({ name });

  onSubmit = async (e) => {
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
          Category
          <Selector
            color='primary'
            style={{ width: '80%' }}
            values={this.categories}
            onChange={this.onCategorySelected}
          />
        </Block>
        <InlineBlock>
          Date Start
          <DatePicker selected={dateStart} onChange={date => this.onDateChanged(date, true)} />
        </InlineBlock>
        <InlineBlock>
          Date End
          <DatePicker selected={dateEnd} onChange={date => this.onDateChanged(date)} />
        </InlineBlock>
        <Block>
          Price Min
          <NumberInput value={minPrice} onChange={e => this.onPriceChanged(e, true)} />
          Price Max
          <NumberInput value={maxPrice} onChange={e => this.onPriceChanged(e)} />
        </Block>
        <Block>
          Name
          <TextInput
            value={name}
            onChange={this.onNameChanged}
            style={{ width: '85%' }}
          />
        </Block>
        <br />
        <ThemedButton color='primary' onClick={this.onSubmit}>Filtrer</ThemedButton>
        {hasError && <StyledError>{errors.global}</StyledError>}
      </Form>
    );
  }
}

export default FilterForm;
