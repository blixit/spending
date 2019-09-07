import React from 'react';
import styled from 'styled-components';

import Selector from 'components/inputs/selector/Selector';

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 auto;
`;

class ChartFilterForm extends React.Component {

  state = {
    timeScale: 'Day'
  };

  temporalFilters = [
    'All',
    'Year',
    'Semester',
    'Quarter',
    'Month',
    'Week',
    'Day',
  ];

  onTimeScaleChanged = async (e) => {
    const timeScale = e.target.value;
    const { onRefresh, refreshQuery } = this.props;
    
    try {
      const response = await refreshQuery({
        timeScale
      });
      this.setState({ timeScale });
      onRefresh && onRefresh(response);
    } catch (e) {
      // errors.global = search.queryError || e.message;
      // this.setState({ hasError: true, errors });
    }
  }

  render() {
    const { timeScale } = this.state;

    return (
      <React.Fragment>
        <Block>
          Echelle de temps
          <Selector
            color='primary'
            style={{ width: '80%' }}
            selected={timeScale}
            values={this.temporalFilters}
            onChange={this.onTimeScaleChanged}
          />
        </Block>
      </React.Fragment>
    );
  }
};

export default ChartFilterForm;
