import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loader from '../Loader';
import EmptyBar from '../../assets/images/EmptyBar.svg';

let mounted = false;
let chartOptions = {
  chart: {
    type: 'bar'
  },
  title: {
      text: ''
  },
  colors: ['#FDBC54'],
  subtitle: {
      // text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
  },
  xAxis: {
    categories: [],
    title: {
        text: false,
    },
    max: 4,
    scrollbar: {
      enabled: true
    },
  },
  yAxis: {
      min: 0,
      title: {
          text: false,
          // align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
    formatter: function () {          
      return (
        `<div style="border-color:${this.color}">
          <table>
            <tr>
              <td> <span>${this.x}: </span> </td>
              <td> <span><strong>${this.y}</strong></span></td>
            </tr>
          </table>
        </div>`
      );
    },
    shared: true,
    useHTML: true,
  },
  plotOptions: {
      bar: {
          dataLabels: {
              enabled: true
          }
      }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
  credits: {
      enabled: false
  },
  series: [{
      name: '',
      data: []
  },],
  loading: {
    buffer: true,
    flag: true,
  },
}

const ChartContainer = ({children}) => (
  <>
    <div className="position-relative">
      <div className="flex-center mt-3 mb-5"> 
        {children}
      </div>
    </div>
  </>
)

const BarChart = (props) => {

  const {data, categories, options} = props;
  const [state, setState] = useState(chartOptions);
  
  useEffect(() => {
    if (typeof data === 'undefined') { return; }
    let max = (options.xAxis && options.xAxis.max) ? options.xAxis.max : chartOptions.xAxis.max;
    let enabled = ((options.xAxis && options.xAxis.scrollbar && options.xAxis.scrollbar.enabled) ? options.xAxis.scrollbar.enabled : chartOptions.xAxis.scrollbar.enabled);

    setState({
      ...state,
      ...options,
      chart: {
        ...state.chart,
        ...options.chart,
      },
      xAxis: {
        ...state.xAxis,
        ...options.xAxis,
        max: (data && data.length-1 >= max) ? max : data.length-1,
        scrollbar: {
          enabled: (data && data.length-1 >= max) ? enabled : false, 
        },
        categories: categories,
      },
      series: [{
        ...state.series[0],
        data: data,
      }],
      loading: {
        buffer: true,
        flag: !state.loading.flag
      }
    });
  }, [props])

  useEffect(() => {
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
        (props.data === undefined || props.loading || state.loading.buffer === true) ? 
          <ChartContainer>
            <Loader />
          </ChartContainer>
        : (state.series[0].data && state.series[0].data.length) ?
          <HighchartsReact highcharts={Highcharts} options={state} /> 
        :
          <ChartContainer>
            <img src={EmptyBar} alt="Empty Data" />
          </ChartContainer>
      }     
    </>
  )
}

BarChart.defaultProps = {
  options: {},
};
export default BarChart
