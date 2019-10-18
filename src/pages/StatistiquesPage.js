import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  Bar as BarComponent,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryVoronoiContainer as VictoryVoronoiContainerComponent
} from 'victory';


import { ReadyQueries as Queries, mutate } from 'core/http/query';
import { hydrate, use } from 'core/hocs/query-wrapper';

import ChartFilterForm from 'components/forms/ChartFilterForm';

import PageComponent from 'pages/Page';

const Page = styled(PageComponent)`
  flex-direction: column;
`;

const VictoryVoronoiContainer = styled(VictoryVoronoiContainerComponent)`
  background: white;
`;

const chartStyle = {
  parent: {
    border: "1px solid #ccc",
    marginTop: '20px'
  }
};

const Bar = styled(BarComponent)`
  fill: ${({ datum }) => {
    return datum.price > 0 ? 'green' : 'red';
  }} !important;
`;

const StyledFilterForm = styled(ChartFilterForm)`
  margin-top: ${({ showFilter }) => showFilter ? '20px' : 0 };
  margin-bottom: 10px;
`;

const prepareItems = items =>
  items.map(x => ({ ...x, price: Number(x.price)})).reverse();

const StatistiquesPage = props => {
  const [items, setItems] = useState(props.items ? prepareItems(props.items.data.data) : []);

  const onRefresh = useCallback( ({ data: { data: retults } }) => {
    setItems(prepareItems(retults));
  }, []);

  const { latests } = Queries.spending;

  return (
    <Page {...props}>
      <StyledFilterForm
        onRefresh={onRefresh}
        refreshQuery={body => mutate({ ...latests, data: body })}
      />
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        // domain={{ y: [-5000, 5000] }}
        containerComponent={<VictoryVoronoiContainer />}
        style={chartStyle}
      >
        <VictoryAxis
          dependentAxis
          orientation="left"
          crossAxis
        />
        <VictoryAxis
          tickLabelComponent={<VictoryLabel angle={90} dx={20} dy={15} />}
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 20, padding: 30},
            grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "grey"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: 8, padding: 5}
          }}
          orientation='bottom'
        />
        <VictoryBar
          data={items}
          alignment="start"
          dataComponent={<Bar />}
          labels={({ datum: { label } }) => {
            return label ? label.substring(0, 2) : label;
          }}
          // data accessor for x values
          x={item => item.date ? (new Date(item.date)).toLocaleDateString() : ''}
          // data accessor for y values
          y="price"
          // animate={{
          //   duration: 500,
          //   onLoad: { duration: 500 }
          // }}
        />
      </VictoryChart>
    </Page>
  );
};

export default hydrate(
  StatistiquesPage,
  use(Queries.test, 'items')
);
