import React, { Component } from 'react'
import axios from 'axios'
import config from '../../config'
import { Container, Row, Col, Button } from 'reactstrap'
import Select from 'react-select'
import WeatherData from './WeatherData'
import WeatherChart from './WeatherChart'
import moment from 'moment'
import '../../css/Weather.css'

const cityOptions = [
  { value: 'Krung Thep Mahanakhon', label: 'กรุงเทพมหานคร' },
  { value: 'Changwat Samut Prakan', label: 'สมุทรปราการ' },
  { value: 'Changwat Nonthaburi', label: 'นนทบุรี' },
  { value: 'Changwat Kanchanaburi', label: 'กาญจนบุรี' },
  { value: 'Changwat Prachin Buri', label: 'ปราจีนบุรี' },
  { value: 'Changwat Nakhon Ratchasima', label: 'นครราชสีมา' },
  { value: 'Changwat Nakhon Sawan', label: 'นครสวรรค์' },
  { value: 'Changwat Maha Sarakham', label: 'มหาสารคาม' },
  { value: 'Changwat Phetchaburi', label: 'เพชรบุรี' },
  { value: 'Changwat Chon Buri', label: 'ชลบุรี' },
  { value: 'Changwat Samut Sakhon', label: 'สมุทรสาคร' },
  { value: 'Changwat Ubon Ratchathani', label: 'อุบลราชธานี' },
  { value: 'Changwat Uttaradit', label: 'อุตรดิตถ์' },
  { value: 'Changwat Ratchaburi', label: 'ราชบุรี' },
  { value: 'Changwat Nakhon Nayok', label: 'นครนายก' },
  { value: 'Changwat Mukdahan', label: 'มุกดาหาร' },
  { value: 'Changwat Surat Thani', label: 'สุราษฎร์ธานี' },
  { value: 'Changwat Phra Nakhon Si Ayutthaya', label: 'พระนครศรีอยุธยา' },
  { value: 'Changwat Songkhla', label: 'สงขลา' },
  { value: 'Changwat Trang', label: 'ตรัง' },
  { value: 'Changwat Yala', label: 'ยะลา' },
  { value: 'Changwat Ranong', label: 'ระนอง' },
  { value: 'Changwat Pattani', label: 'ปัตตานี' },
  { value: 'Changwat Surin', label: 'สุรินทร์' },
  { value: 'Changwat Nan', label: 'น่าน' },
  { value: 'Changwat Lamphun', label: 'ลำพูน' },
  { value: 'Changwat Roi Et', label: 'ร้อยเอ็ด' },
  { value: 'Changwat Buriram', label: 'บุรีรัมย์' },
  { value: 'Changwat Loei', label: 'เลย' },
]
const dateOptions = [
  {
    value: moment().format('DD MMMM YYYY'),
    label: 'Today'
  },
  {
    value: moment()
      .add(1, 'days')
      .format('DD MMMM YYYY'),
    label: moment()
      .add(1, 'days')
      .format('DD MMMM YYYY')
  },
  {
    value: moment()
      .add(2, 'days')
      .format('DD MMMM YYYY'),
    label: moment()
      .add(2, 'days')
      .format('DD MMMM YYYY')
  },
  {
    value: moment()
      .add(3, 'days')
      .format('DD MMMM YYYY'),
    label: moment()
      .add(3, 'days')
      .format('DD MMMM YYYY')
  },
  {
    value: moment()
      .add(4, 'days')
      .format('DD MMMM YYYY'),
    label: moment()
      .add(4, 'days')
      .format('DD MMMM YYYY')
  }
]
class Weather extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      cityList: [
        'Krung Thep Mahanakhon',
        'Changwat Samut Prakan',
        'Changwat Nonthaburi',
        'Changwat Kanchanaburi',
        'Changwat Prachin Buri',
        'Changwat Nakhon Ratchasima',
        'Changwat Nakhon Sawan',
        'Changwat Maha Sarakham',
        'Changwat Phetchaburi',
        'Changwat Chon Buri',
        'Changwat Samut Sakhon',
        'Changwat Ubon Ratchathani',
        'Changwat Uttaradit',
        'Changwat Ratchaburi',
        'Changwat Nakhon Pathom',
        'Changwat Nakhon Nayok',
        'Changwat Mukdahan',
        'Changwat Surat Thani',
        'Changwat Phra Nakhon Si Ayutthaya',
        'Changwat Songkhla',
        'Changwat Trang',
        'Changwat Yala',
        'Changwat Ranong',
        'Changwat Pattani',
        'Changwat Surin',
        'Changwat Nan',
        'Changwat Lamphun',
        'Changwat Roi Et',
        'Changwat Buriram',
        'Changwat Loei',
      ],
      showedData: {},
      selectedCity: '',
      storedDataId: [],
      isShowed: false,
      selectedDate: '',
      date: '',
      city: '',
      invalidCity: false,
      invalidDate: true
    }
  }
  handleCityChange(selectedCity) {
    console.log('selectedCity', selectedCity)
    this.setState({ selectedCity })
  }
  handleDateChange(selectedDate) {
    console.log('selectedDate', selectedDate)
    this.setState({ selectedDate })
  }
  async getData(selectedCity) {
    const { cityList, storedDataId, data, selectedDate } = this.state
    const id = cityList.indexOf(selectedCity.value)
    if (storedDataId.indexOf(id) === -1) {
      await axios
        .get(`${config.url}?q=${cityList[id]},TH&APPID=${config.key}`)
        .then(res => {
          const citydata = res.data
          citydata['id'] = id
          data.push(citydata)
          storedDataId.push(id)
          this.setState({ data, showedData: citydata })
        })
    } else {
      let showedData = data.filter(e => {
        if (e.id === id) return e
      })
      console.log('data', data)
      console.log('showedData', showedData)
      showedData = showedData[0]
      this.setState({ showedData })
    }
    this.setState({
      isShowed: true,
      date: selectedDate.value,
      city: selectedCity.label
    })
  }
  render() {
    const {
      selectedCity,
      showedData,
      isShowed,
      selectedDate,
      date,
      city
    } = this.state
    return (
      <Container style={{ marginTop: '80px', color: 'rgb(0,25,108' ,marginLeft:'100px' }}>
        <img
          src="http://www.puppylandla.com/images/wallpaper-light-blue.png"
          className="bg"
          alt=""
        />
        <Row style={{ border: '1px solid #DEDEDE' }}>
          <Col className="weather-forecast-title" fluid={true}>
            Weather Forecast
          </Col>
        </Row>
        <Row>
          <Col>
            Please Select City
            <Select
              classNamePrefix="select-city"
              onChange={e => this.handleCityChange(e)}
              value={selectedCity}
              options={cityOptions}
              placeholder="select city"
            />
          </Col>
          <Col>
            Choose Date
            <Select
              classNamePrefix="select-city"
              onChange={e => this.handleDateChange(e)}
              value={selectedDate}
              options={dateOptions}
              isSearchable={false}
              placeholder="select date"
            />
          </Col>
          <Col style={{ alignSelf: 'flex-end' }}>
            <Button color="blue" onClick={() => this.getData(selectedCity)}>
              Go
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {isShowed && (
              <div className="province-name">
                <br />
                {city}
                <WeatherData data={showedData} selectedDate={date} /><br />
                <WeatherChart data={showedData} selectedDate={date} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Weather
