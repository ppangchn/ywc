import React, { Component } from 'react'
import { Navbar, NavLink, Nav } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun } from '@fortawesome/free-solid-svg-icons'
import '../css/Header.css'

const Home = styled.div`
  &:hover {
    color: white;
    transition: 0.3s;
  }
`
const Weather = styled.div`
  &:hover {
    color: white;
    transition: 0.3s;
  }
`
const Vacation = styled.div`
  &:hover {
    color: white;
    transition: 0.3s;
  }
`
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homebold: 'bold',
      weatherbold: '',
      vacationbold:''
    }
  }
  changeHomeTitle() {
    this.clear()
    this.setState({ homebold: 'bold' })
    this.props.history.push('/')
  }
  changeWeatherTitle() {
    this.clear()
    this.setState({ weatherbold: 'bold' })
    this.props.history.push('/weather')
  }
  changeVacationTitle() {
    this.clear()
    this.setState({ vacationbold: 'bold' })
    this.props.history.push('/vacation')
  }
  updatePath() {
    this.clear()
    const path = window.location.pathname
    if (path === '/') this.setState({ homebold: 'bold' })
    else if (path === '/weather') this.setState({ weatherbold: 'bold' })
    else if (path === '/vacation') this.setState({ vacationbold: 'bold' })
  }
  clear() {
    this.setState({ homebold: '', weatherbold: '' ,vacationbold:''})
  }
  componentDidMount() {
    this.updatePath()
  }
  componentWillReceiveProps() {
    this.updatePath()
  }
  render() {
    return (
      <Navbar
        fixed="top"
        style={{
          backgroundColor: 'rgb(0,25,108,0.8)',
          color: '#BCBCBC',
        }}
      >
        <Nav>
          <NavLink>
            <FontAwesomeIcon icon={faCloudSun} />
          </NavLink>

          <NavLink
            style={{ cursor: 'pointer' }}
            onClick={() => this.changeHomeTitle()}
          >
            <Home className={this.state.homebold}>Home</Home>
          </NavLink>
          <NavLink
            style={{ cursor: 'pointer' }}
            onClick={() => this.changeWeatherTitle()}
          >
            <Weather className={this.state.weatherbold}>Weather</Weather>
          </NavLink>
          {/* <NavLink
            style={{ cursor: 'pointer' }}
            onClick={() => this.changeVacationTitle()}
          >
            <Vacation className={this.state.vacationbold}>Vacation</Vacation>
          </NavLink> */}
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(Header)
