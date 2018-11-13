import React, { Component } from 'react'
import { UncontrolledCarousel,Button } from 'reactstrap'
import styled from 'styled-components'
import '../css/Home.css'
const items = [
  {
    src: 'http://ilposgoode.com/wp-content/uploads/2018/01/Bangkok-Thailand.jpg'
  },
  {
    src: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/5PNlDRM/timelapse-shot-of-lightnings-striking-in-dark-sky-over-night-illuminated-bangkok-night-panorama-of-thailand-capital_br2s_eegl_thumbnail-full01.png'
  },
  {
    src: 'http://www.wallpaperaholic.com/images/5/UG4EKv5e.jpg'
      
  }
]
const Title = styled.div`
  position: absolute;
  top: 10vw;
  left: 10%;
  color: white;
  font-size: 5vw;
`
class Home extends Component {
  goToWeatherPage() {
    this.props.update()
    this.props.history.push('/weather')
  }
  render() {
    return (
      <div>
        <UncontrolledCarousel pause="false" items={items} />
        <Title>Weather Forecast<br/>Thailand</Title>
        <Button color="white" onClick={() => {this.goToWeatherPage()}}>
          Get started for free
        </Button>
      </div>
    )
  }
}
export default Home
