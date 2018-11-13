import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import config from '../../config'
import moment from 'moment'
import '../../css/WeatherDataDetail.css'
class WeatherDataDetail extends Component {
  constructor() {
    super()
    this.state = {
      temp: 0,
      time:''
    }
  }
  getTime(time) {
    const formatTime = moment(time).format('LT')
    this.setState({time: formatTime})
  }
  changeKelvinToCelcius(temp) {
    let ans = temp - 273.15
    this.setState({ temp: ans.toFixed(0) })
  }
  componentDidMount() {
    const { temp } = this.props.data.main
    const time = this.props.data.dt_txt
    this.changeKelvinToCelcius(temp)
    this.getTime(time)
  }
  componentWillReceiveProps(props) {
    this.changeKelvinToCelcius(props.data.main.temp)
    this.getTime(props.data.dt_txt)
  }
  render() {
    const { data } = this.props
    const { temp,time } = this.state
    return (
      <Card style={{border:'none',borderRadius:'0'}}>
        <CardBody className="weather-data-detail">
        <CardTitle>{time}</CardTitle>
          <CardTitle>{`${temp}°C`}<img src={`${config.urlIcon}${data.weather[0].icon}.png`} alt=""/></CardTitle>
          <CardSubtitle>{data.weather[0].description}</CardSubtitle>
        </CardBody>
      </Card>
    )
  }
}

export default WeatherDataDetail
