import React, { Component } from 'react'
import moment from 'moment'
import WeatherDataDetail from './WeatherDataDetail'

class WeatherData extends Component {
  constructor() {
    super()
    this.state = {
      averageTemp: 0,
      currentTemp: 0,
      listOfData: [],
      listTemp: [],
      isCurrentDay: false,
      showedTemp: 0,
      tempDes: ''
    }
  }
  changeKelvinToCelcius(averageTemp) {
    const ans = averageTemp - 273.15
    return ans
  }
  isCurrentDay(selectedDate) {
    let { isCurrentDay } = this.state
    if (moment().format('DD MMMM YYYY') === selectedDate) isCurrentDay = true
    else isCurrentDay = false
    this.setState({ isCurrentDay })
    return isCurrentDay
  }
  calAverageTemp(data, selectedDate) {
    this.getAllTemp(data, selectedDate)
    const { listTemp } = this.state
    if (listTemp.length > 0) {
      let total = 0
      total = listTemp.reduce((total, current) => current + total)
      let averageTemp = total / listTemp.length
      averageTemp = this.changeKelvinToCelcius(averageTemp).toFixed(0)
      this.setState({
        averageTemp,
        showedTemp: averageTemp,
        tempDes: 'Average Temperature'
      })
    }
  }
  callCurrentTemp(data, selectedDate) {
    const { listOfData } = this.state
    let currentTemp = 0
    let isNotFound = true
    if (data) {
      data.list.map(l => {
        if (moment(l.dt_txt).format('DD MMMM YYYY') === selectedDate) {
          if (isNotFound) {
            currentTemp = this.changeKelvinToCelcius(l.main.temp).toFixed(0)
            let time = moment(l.dt_txt).format('HH');
            time = +time
            console.log(time)
            if (time == moment().format('HH')) isNotFound = false
            else if (time < moment().format('HH') && moment().format('HH') < (time+3)%24) isNotFound = false
          }
          listOfData.push(l)
        }
      })
    }
    this.setState({
      currentTemp,
      showedTemp: currentTemp,
      tempDes: 'Current Temperature'
    })
  }
  getAllTemp(data, selectedDate) {
    const { listOfData, listTemp } = this.state
    if (data) {
      data.list.map(l => {
        if (moment(l.dt_txt).format('DD MMMM YYYY') === selectedDate) {
          listTemp.push(l.main.temp)
          listOfData.push(l)
        }
      })
    }
    this.setState({ listTemp })
  }
  clear() {
    this.state.listTemp = []
    this.state.listOfData = []
  }
  componentDidMount() {
    const { data, selectedDate } = this.props
    const isCurrentDay = this.isCurrentDay(selectedDate)
    if (isCurrentDay) this.callCurrentTemp(data, selectedDate)
    else this.calAverageTemp(data, selectedDate)
  }
  componentWillReceiveProps(props) {
    this.clear()
    const { data, selectedDate } = props
    const isCurrentDay = this.isCurrentDay(selectedDate)
    if (isCurrentDay) this.callCurrentTemp(data, selectedDate)
    else this.calAverageTemp(data, selectedDate)
  }
  render() {
    const { tempDes, showedTemp, listOfData } = this.state
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ fontSize: '2vw', display: 'flex', alignSelf: 'center' }}
          >
            {tempDes}
          </div>
          {`: ${showedTemp} °C`}
        </div>
        <div
          style={{
            display: 'flex',
            boxShadow: '-12px 10px 16px -4px #9A9A9A',
            width: 'fit-content'
          }}
        >
          {listOfData.map(l => {
            return <WeatherDataDetail key={l.dt} data={l} />
          })}
        </div>
      </div>
    )
  }
}

export default WeatherData
