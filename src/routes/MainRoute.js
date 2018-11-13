import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import Home from '../pages/Home'
import Weather from '../pages/Weather/Weather'
import Vacation from '../pages/Vacation/Vacation'

class MainRoute extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={(routeprops) => <Home {...routeprops} {...this.props} />} />
          <Route path="/weather" component={withRouter(Weather)} />
          <Route path="/vacation" component={withRouter(Vacation)} />
        </Switch>
    )
  }
}
export default MainRoute
