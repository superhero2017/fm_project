/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import { Elements } from 'react-stripe-elements';
import {
  Button as UIButton,
  Divider as UIDivider,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Message as UIMessage,
  Segment as UISegment,
} from 'semantic-ui-react'

import { getMealById, getCurrentUserId, } from '../selectors'
import { getMealPath, } from '../urls'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../lib/validators'
import { rsvpRequest, } from '../actions/'

import Modal from '../containers/Modal'
import RsvpForm from '../containers/forms/RsvpForm'

class RsvpView extends Component {
  // static propTypes = {
  //   meal: PropTypes.object,
  //   userId: PropTypes.number,
  //   status: PropTypes.object,
  //   dispatch: PropTypes.func.isRequired,
  // }

  // constructor(props) {
  //   super(props)
  //   const { meal, userId, dispatch, } = props
  //   // console.log("COMPONENET WILL UPDATE");
  //   // console.log(meal.owner)
  //   // console.log(userId)
  //   if (meal.owner === userId) {
  //     dispatch(replace(getMealPath(meal.id)))
  //   }
  // }
  //
  // componentWillUnmount() {
  //   const { dispatch } = this.props
  //   dispatch(actions.reset("forms.rsvp"))
  // }
  //
  // Don't use Control.button for the submission! It Causes errors
  render() {
    return (
      <Modal>
        <Elements>
          <RsvpForm />
        </Elements>
      </Modal>
    )
  }
}


export default RsvpView
