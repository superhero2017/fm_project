/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, } from 'react-router-dom'
import {
  Container as UIContainer,
  Segment as UISegment,
} from 'semantic-ui-react'

import MealPage from '../containers/MealPage'
import MealsDisplay from '../containers/MealsDisplay'
import MenuBar from '../containers/MenuBar'
import NewMealPage from '../containers/NewMealPage'
import PublicProfile from '../containers/PublicProfile'

import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'

import withAccessControl from '../hocs/withAccessControl'

const Masthead = ({ height, photo, children }) => {

  var bgProps = {}
  if (photo) {
    bgProps = {
      backgroundImage: `url(${photo})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }
  } else {
    bgProps = {
      background: "#18BC9C",
    }
  }

  const containerStyle = {
    textAlign: "center",
    margin: "0",
    paddingLeft: "0",
    paddingRight: "0",
    display: "block",
    width: "100%" ,
    paddingTop: "50px",
    paddingBottom: "50px",
    height,
    ...bgProps,
  }

  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}

export default Masthead
