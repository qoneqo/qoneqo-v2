import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Loader from '../Loader';
import EmptyLine from '../../assets/images/EmptyLine.svg';

let mounted = false;

let chartOptions = {
  title: {
    text: '',
  },
  yAxis: {
    title: {
      text: false,
    },
  },
  tooltip: {
    formatter: function () {
      return `<div style="border-color:${this.color}">
          <table>
            <tr>
              <td> <span>${this.x}: </span> </td>
              <td> <span><strong>${this.y}</strong></span></td>
            </tr>
          </table>
        </div>`;
    },
    shared: true,
    useHTML: true,
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  series: [
    {
      name: '',
      data: [],
    },
  ],
  loading: {
    buffer: true,
    flag: true,
  },
  credits: false,
  status: false,
};

const ChartContainer = ({ children }) => (
  <>
    <div className="flex items-center justify-center h-full">{children}</div>
  </>
);

const LineChart = (props) => {
  const { data, categories, options } = props;
  const [state, setState] = useState(chartOptions);
  useEffect(() => {
    setState({
      ...state,
      ...options,
      xAxis: {
        ...state.xAxis,
        ...options.xAxis,
        categories: categories,
      },
      series: [
        {
          ...state.series[0],
          data: data,
        },
      ],
      loading: {
        buffer: true,
        flag: !state.loading.flag,
      },
    });
  }, [props]);

  useEffect(() => {
    if (mounted) {
      setState((prev) => ({
        ...prev,
        loading: {
          flag: state.loading.flag,
          buffer: false,
        },
      }));
    }
    mounted = true;
  }, [state.loading.flag]);
  return (
    <>
      {props.data === undefined ||
      props.loading ||
      state.loading.buffer === true ? (
        <ChartContainer>
          <Loader />
        </ChartContainer>
      ) : state.series[0].data.length ? (
        <HighchartsReact highcharts={Highcharts} options={state} />
      ) : (
        <ChartContainer>
          <img className="h-full" src={EmptyLine} alt="Empty Data" />
        </ChartContainer>
      )}
    </>
  );
};

LineChart.defaultProps = {
  options: {},
  className: '',
  data: [],
  categories: [],
};
export default React.memo(LineChart);
