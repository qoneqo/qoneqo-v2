import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loader from '../Loader';
import EmptyPie from '../../assets/images/EmptyPie.svg';

let mounted = false;
  

let chartOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: '',
  },
  legend: {
    align: 'right',
    layout: 'vertical',
    verticalAlign: 'middle',
  },
  tooltip: {
    formatter: function () {
      return (
        `<div style="border-color:${this.color}">
          <table>
            <tr>
              <td> <span>${this.key}: </span> </td>
              <td> <span><strong>${this.y} (${parseFloat(this.percentage).toFixed(2)}%)</strong></span></td>
            </tr>
          </table>
        </div>`
      );
    },
    shared: true,
    useHTML: true,
  },
  // tooltip: {
  //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  // },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#296ABB', '#3989DA', '#67AEE8', '#87C8F3', '#D7F1FD'],
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '<br>{point.percentage:.2f} %',
        distance: -50,
        filter: {
          property: 'percentage',
          operator: '>',
          value: 2,
        },
      },
    },
  },
  series: [
    {
      name: '',
      colorByPoint: true,
      data: [],
    },
  ],
  credits: false,
  loading: {
    buffer: true,
    flag: true,
  },
};

const ChartContainer = ({children}) => (
  <>
    <div className="position-relative">
      <div className="flex-center mt-3 mb-5"> 
        {children}
      </div>
    </div>
  </>
)

const PieChart = (props) => {
  const { data, options } = props;
  const [state, setState] = useState(chartOptions);
  useEffect(() => {
    if (typeof data === 'undefined') { return; }
    setState({
      ...state,
      ...options,
      chart: {
        ...state.chart,
        ...options.chart,
      },
      plotOptions: {
        ...state.plotOptions,
        pie: {
          ...state.plotOptions.pie,
          colors: ((options.plotOptions && options.plotOptions.pie && options.plotOptions.pie.colors) ? options.plotOptions.pie.colors : state.plotOptions.pie.colors),
          dataLabels: {
            ...state.plotOptions.pie.dataLabels,
          }
        }
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
      }
    });
  }, [props]);

  useEffect(() => {
    /**
     * Mounted used because of default data is empty []
     * and we want to show loading gif instead of empty image
     */
    if (mounted) {
      setState((prev) => ({
        ...prev,
        loading: {
          flag: state.loading.flag,
          buffer: false,
        }
      }))
    }
    mounted = true;
  }, [state.loading.flag])

  return (
    <>
      {
        (props.data === undefined || props.loading ||  state.loading.buffer === true) ?
          <ChartContainer>
            <Loader />
          </ChartContainer>
        : (state.series[0].data && state.series[0].data.length) ?
          <HighchartsReact highcharts={Highcharts} options={state} />
        : 
          <ChartContainer>
            <img src={EmptyPie} alt="Empty Data" />
          </ChartContainer>
      }
    </>
  );
};

PieChart.defaultProps = {
  options: {
  },
};
export default React.memo(PieChart);
