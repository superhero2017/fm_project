/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import {
  Button as UIButton,
  Divider as UIDivider,
  Form as UIForm,
  Grid as UIGrid,
  Header as UIHeader,
  Icon as UIIcon,
  Message as UIMessage,
  Segment as UISegment,
  Step as UIStep,
} from 'semantic-ui-react'

import {
  getMealById, getCurrentUserId,
} from '../../selectors'
import { getMealPath, } from '../../urls'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../../lib/validators'
import { rsvpRequest, } from '../../actions/'

import CheckoutStep from '../../components/CheckoutStep'

class RsvpButtonSection extends Component {
  static propTypes = {
    meal: PropTypes.object,
    userId: PropTypes.number,
    status: PropTypes.object,
    stage: PropTypes.number.isRequired,
    // dispatch: PropTypes.func.isRequired,
  }

  // handleSubmit = (rsvp) => {
  //   const { dispatch, meal, } = this.props
  //   // const { dispatch, rsvpRequest, meal, } = this.props
  //   console.log("Form handleSubmit")
  //   // console.log(meal)
  //   // console.log(rsvp)
  //
  //   dispatch(rsvpRequest({ rsvp, meal, }))
  // }

  // Don't use Control.button for the submission! It Causes errors
  render() {
    const {
      handleBackClick, handleNextClick, handleCancelClick,
      nextDisabled, submitDisabled,
      stage, meal,
    } = this.props


    return (
      <UIGrid >
        <UIGrid.Row>
          <UIGrid.Column width="11">
            <UIForm.Group inline>

              <UIForm.Button
                color="blue"
                onClick={handleBackClick}
                disabled={stage === 0}
                basic
              >
                Back
              </UIForm.Button>

              {
                stage === 2 ?
                <UIForm.Button
                  type="submit"
                  color="blue"
                  disabled={submitDisabled()}
                  basic
                >
                  Submit
                </UIForm.Button> :
                <UIForm.Button
                  color="blue"
                  onClick={handleNextClick}
                  disabled={nextDisabled()}
                  basic
                >
                  Next
                </UIForm.Button>
              }

            </UIForm.Group>
          </UIGrid.Column>
          <UIGrid.Column width="5" textAlign='right'>
            <UIForm.Field className='ui right floated'>
              <UIButton basic
                floated='right'
                onClick={handleCancelClick}
              >
                Cancel
              </UIButton>
            </UIForm.Field>
          </UIGrid.Column>
        </UIGrid.Row>
      </UIGrid>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//
//   // const id = ownProps.match.params.id
//   // const meal = state.meals.items[id]
//   const meal = getMealById(state, ownProps.match.params.id)
//   // console.log(meal)
//   const userId = getCurrentUserId(state)
//   // console.log(userId)
//
//   return {
//     status: state.status.rsvp,
//     meal,
//     userId,
//   }
// }

// export default withRouter(connect(mapStateToProps)(RsvpForm))
export default RsvpButtonSection
