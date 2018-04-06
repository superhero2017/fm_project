import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router-dom'
import App from './containers/App'
import Root from './containers/Root'
import Meal from './components/Meal'

export default(
  <Router history={hashHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={App} />
      <Route path="/meal/:mealId" component={Meal} />
    </Route>
  </Router>
)
