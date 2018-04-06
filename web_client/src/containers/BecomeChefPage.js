/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Route, Switch, } from 'react-router-dom'
import { Control, Form, Errors, actions, } from 'react-redux-form'
import {
  Button as UIButton,
  Container as UIContainer,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Label as UILabel,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'

import { isMobile } from '../lib/responsive'
import { getCookPageBannerPhoto, routerBecomeChefPath, } from '../urls'
import { getClientProfile, } from '../selectors'
import withAccessControl from '../hocs/withAccessControl'

import ChefApplicationForm from '../containers/forms/ChefApplicationForm'

import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'
import Masthead from '../components/Masthead'
import VerticalStep from '../components/VerticalStep'


const BecomeChefPage = (props) => {
  const { profile } = props
  const missingProfileInfo = profile ? !profile.dob : false

  return (
    <div>
    {
      missingProfileInfo ?
      <UIMessage
        color='blue'
        size='big'
        icon='warning sign'
        header='We noticed that your profile is missing information'
        content="Please fill out your profile to continue"
      /> :
      <div />
    }
      <UIHeader as="h1">
        Becoming a Feedme Chef is Easy
        <UIHeader.Subheader>
          But we need a few details from you first.
          <br />
          After you apply, we will review your application and get back to you as soon as possible.
        </UIHeader.Subheader>
      </UIHeader>

      <ChefApplicationForm />

      <br />
      <br />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  const profile = getClientProfile(state)

  return {
    profile,
  }
}

export default connect(mapStateToProps)(BecomeChefPage)
