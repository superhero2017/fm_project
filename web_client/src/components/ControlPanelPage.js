/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Segment as UISegment,
  List as UIList,
  Icon as UIIcon,
} from 'semantic-ui-react'

import {
  getDashboardPath,
  getEditProfilePath,
  getMealsCookingPath,
} from '../urls'
import ControlPanelMenu from '../containers/ControlPanelMenu'
import Dashboard from '../containers/DashboardPage'
import ProfilePage from '../containers/ProfilePage'
import MealsCooking from '../containers/MealsCooking'
import withAccessControl from '../hocs/withAccessControl'

const ControlPanelPage = () => {
  return (
    <div className='account-container'>
      <ControlPanelMenu />
      <Switch>
        <Route
          exact
          path={getDashboardPath()}
          component={Dashboard} />
        <Route
          exact
          path={getMealsCookingPath()}
          component={MealsCooking} />
        <Route
          path={getEditProfilePath()}
          component={ProfilePage} />
      </Switch>
    </div>
  )
}

export default ControlPanelPage
