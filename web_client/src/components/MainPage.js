/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, } from 'react-router-dom'
import {
  Container as UIContainer,
} from 'semantic-ui-react'

import MealPage from '../containers/MealPage'
import MealsDisplay from '../containers/MealsDisplay'
import MenuBar from '../containers/MenuBar'
import NewMealPage from '../containers/NewMealPage'
import PublicProfile from '../containers/PublicProfile'
import CookPage from '../containers/CookPage'

import MainContainer from '../components/MainContainer'
import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'

import withAccessControl from '../hocs/withAccessControl'

const MainPage = () => {
  return (
    <div className='main-wrapper'>
      <MenuBar className='menu-bar-wrapper'/>
      <div className="main-content" style={{display: "flex"}}>
        <Switch>
          <Route
            exact
            path="/cook"
            component={CookPage}
          />
          <Route
            path="/"
            component={MainContainer}
          />
        </Switch>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default MainPage
