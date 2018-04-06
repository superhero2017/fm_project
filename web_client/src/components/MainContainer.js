/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, } from 'react-router-dom'
import {
  Container as UIContainer,
} from 'semantic-ui-react'

import {
  routerBecomeChefPath
} from '../urls'

import MealPage from '../containers/MealPage'
import MealsDisplay from '../containers/MealsDisplay'
import MenuBar from '../containers/MenuBar'
import NewMealPage from '../containers/NewMealPage'
import PublicProfile from '../containers/PublicProfile'
import CookPage from '../containers/CookPage'
import BecomeChefPage from '../containers/BecomeChefPage'

import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'

import withAccessControl from '../hocs/withAccessControl'

const MainContainer = () => {
  return (
      <UIContainer style={{paddingTop: "20px"}}>
        <Switch>
            <Route
              exact
              path="/newMeal"
              component={withAccessControl(NewMealPage)}
            />
            <Route
              path="/meals/:id"
              component={MealPage}
            />
            <Route
              exact
              path="/profiles/:id"
              component={PublicProfile}
            />
            <Route
              path="/user"
              component={withAccessControl(ControlPanelPage)}
            />
            <Route
              path={routerBecomeChefPath()}
              component={withAccessControl(BecomeChefPage)}
            />
            <Route
              exact
              path="/"
              component={MealsDisplay}
            />
        </Switch>
      </UIContainer>
  )
}

export default MainContainer
