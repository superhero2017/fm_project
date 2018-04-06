/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Grid as UIGrid,
  Header as UIHeader,
  Label as UILabel,
  Segment as UISegment,
} from 'semantic-ui-react'

import { isMobile } from '../lib/responsive'
import { getCookPageBannerPhoto } from '../urls'
import withAccessControl from '../hocs/withAccessControl'

import MealPage from '../containers/MealPage'
import MealsDisplay from '../containers/MealsDisplay'
import MenuBar from '../containers/MenuBar'
import NewMealPage from '../containers/NewMealPage'
import PublicProfile from '../containers/PublicProfile'

import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'
import Masthead from '../components/Masthead'


const VerticalStep = ({ number, title, children, }) => {

  return (
    <UISegment padded="very">
      <UILabel>{number}</UILabel>
      <UIHeader size="medium" as='span' style={{padding: "10px"}}>
        {title}
      </UIHeader>
      <br /> <br />
      {children}
    </UISegment>
  )
}

export default VerticalStep
