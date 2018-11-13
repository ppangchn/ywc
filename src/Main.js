import React, { Component } from 'react'
import MainRoute from './routes/MainRoute'
import Header from './components/Header'

class Main extends Component {
  constructor() {
    super()
    this.state = { update: Date.now() }
  }
  update() {
    this.setState({ update: Date.now() })
  }
  render() {
    return (
      <div>
        <Header />
        <MainRoute update={() => this.update()} />
      </div>
    )
  }
}
export default Main
