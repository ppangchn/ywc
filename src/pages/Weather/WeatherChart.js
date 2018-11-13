import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

class WeatherChart extends Component {
  constructor() {
    super()
    this.state = { weatherData: {} }
  }
  setData(data, selectedDate) {
    let listTemp = []
    let label = []
    data.list.map(e => {
      if (moment(e.dt_txt).format('DD MMMM YYYY') === selectedDate)
        label.push(moment(e.dt_txt).format('LT'))
      let temp = (e.main.temp - 273.15).toFixed(0)
      listTemp.push(temp)
    })
    let dataSet = [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(0,25,108)',
        borderColor: '#6E8FD2',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(0,25,108)',
        pointBackgroundColor: 'rgb(0,25,108)',
        pointBorderWidth: 10,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'rgb(0,25,108)',
        pointHoverBorderColor: 'rgb(0,25,108)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: listTemp,
        responsive: true
      }
    ]
    const weatherData = { labels: label, datasets: dataSet }
    this.setState({ weatherData })
  }
  componentDidMount() {
    const { data, selectedDate } = this.props
    if (data) this.setData(data, selectedDate)
  }
  componentWillReceiveProps(props) {
    const { data, selectedDate } = props
    if (data) this.setData(data, selectedDate)
  }
  render() {
    const { weatherData } = this.state
    return (
      <Line
        data={weatherData}
        height={80}
        options={{
          scales: {
            xAxes: [
              {

                // gridLines: { color: 'rgb(0,25,108)' },
                stacked: true,
                ticks: { fontColor: 'rgb(0,25,108)', fontSize: 15 },
                borderColor: 'rgb(0,25,108)'
              }
            ],
            yAxes: [
              {
                scaleLabel: 20,
                // gridLines: { color: 'rgb(0,25,108)' },
                stacked: true,
                ticks: {
                  fontSize: 15,
                  fontColor: 'rgb(0,25,108)',
                  suggestedMin: 0,
                  stepSize: 5
                }
              }
            ]
          },
          legend: { display: false }
        }}
      />
    )
  }
}

export default WeatherChart
