import React, { Component } from 'react'
import config from '../../config'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { Container, Row, Col } from 'reactstrap'
import '../../css/Vacation.css'

class Vacation extends Component {
  constructor() {
    super()
    this.state = {
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
        'Changwat Loei'
      ],
      rainyDataF: {},
      rainyDataS: {},
      data: [],
      earth: null
    }
  }
  async calRainyData(data) {
    console.log('SASDF', data)
    let dataF = []
    let dataS = []
    let labelF = []
    let labelS = []
    console.log('earthhlove pang laa', typeof (data), data.length)
    // const res = await Promise.resolve(data[0])
    // console.log(res)
    let i;
    const earth=[];
    for(i =0 ;i<30;i++){
      const temp = await Promise.resolve(data[i]);
      earth.push(temp);
    }
    console.log(earth);
    // await data.forEach((e, index) => {
    //   e.then(x => {
    //     let city = ''
    //     let list = [];
    //     city = x.city.name
    //     list = x.list
    //     let sum = 0
    //     list.map(c => {
    //       if (c.rain !== undefined) {
    //         if (Object.keys(c.rain).length !== 0) {
    //           sum += Number(c.rain['3h'])
    //         }
    //       }
    //     })
    //     sum = Number((sum * 10).toFixed(0))
    //     if (index <= 14) {
    //       console.log('FIRST!', index)
    //       dataF.push(sum)
    //       labelF.push(city)
    //     } else {
    //       console.log('SECOND', index)
    //       dataS.push(sum)
    //       labelS.push(city)
    //     }
    //   })
    // })

    // const datasetF = [
    //   {
    //     label: 'rain',
    //     backgroundColor: '#5bc2e1',
    //     data: dataF
    //   }
    // ]
    // const datasetS = [
    //   {
    //     label: 'rain',
    //     backgroundColor: '#5bc2e1',
    //     data: dataS
    //   }
    // ]
    // const rainyDataF = { labels: labelF, datasets: datasetF }
    // const rainyDataS = { labels: labelS, datasets: datasetS }
    // console.log('pang', rainyDataF, rainyDataS)
    // this.setState({ rainyDataF, rainyDataS })
  }
  async earth(cityList) {
    const data = await cityList.map(async (c) => {
      const res = await axios.get(`${config.url}?q=${c},TH&APPID=${config.key}`)
      const temp = res.data;
      return temp
    })
    var earth = [];
    data.forEach(e => {
      e.then(function (x) {
        var pang = x.city.name
        earth.push((pang).slice());
      })
    })
    this.setState({ earth: earth[0] }, console.log('ertertert', this.state.earth))
    let temp = earth.slice()
    console.log('sfsdfsdf', earth)
    console.log('pang', earth, data)
    return data;
  }
  async getData() {
    const { cityList } = this.state
    let data = []
    data = await this.earth(cityList);
    this.calRainyData(data)
    // cityList.map(c => {
    //   axios.get(`${config.url}?q=${c},TH&APPID=${config.key}`).then(async res => {
    //     const citydata = res.data;
    //     data.push(citydata)
    //     await this.setState({ data }, console.log(this.state.data))
    //   })
    // }).then(

    //   console.log(this.state.data),
    //   this.calRainyData(this.state.data)
    // )
  }
  componentDidMount() {
    try {
      this.getData()

    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { rainyDataF, rainyDataS } = this.state
    console.log('rainyDataF', rainyDataF)
    console.log('rainyDataS', rainyDataS)
    return (
      <div>
        <img
          src="http://www.puppylandla.com/images/wallpaper-light-blue.png"
          className="bg"
          alt=""
          style={{ zIndex: '-1', height: '100vw' }}
        />
        <Container style={{ marginTop: '80px', color: 'rgb(0,25,128)' }}>
          <Row>
            <Col className="vacation-title">
              Rainy Season{`here->${this.state.earth}`}
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <Bar
                data={rainyDataF}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          suggestedMin: 0,
                          stepSize: 50
                        }
                      }
                    ]
                  }
                }}
              // legend={{ display: false }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Bar
                data={rainyDataS}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          suggestedMin: 0,
                          stepSize: 100
                        }
                      }
                    ]
                  }
                }}
              // legend={{ display: false }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Vacation
