/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import { actions, Control, Errors, Form, Field,} from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import {
  Button as UIButton,
  Container as UIContainer,
  Divider as UIDivider,
  Dropdown as UIDropdown,
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
  modelError,
  dropdownError,
} from '../../lib/validators'
import { rsvpRequest, } from '../../actions/'

import CheckoutStep from '../../components/CheckoutStep'
import FMDropdown from '../../components/FMDropdown'
import Dropdown from '../../containers/Dropdown'

class RsvpDetailsSection extends Component {
  static propTypes = {
    meal: PropTypes.object,
    form: PropTypes.object.isRequired,
    deliveryOptions: PropTypes.array.isRequired,
    userId: PropTypes.number,
    status: PropTypes.object,
    // dispatch: PropTypes.func.isRequired,
  }

  // Don't use Control.button for the submission! It Causes errors
  render() {

    const onDropdownChange = (e, data) => {
      console.log(e);
      console.log(data);
    }

    const { meal, form, deliveryOptions, } = this.props

    return (
      <UIForm.Field>
        <UIForm.Field>
          <Control.textarea
            model=".comments"
            component={UIForm.TextArea}
            mapProps={{
              label: "Comments",
              placeholder: "Any special requests?"
            }}
          />
          <UIContainer fluid>
            {"Add any messages you would like to send to the chef.\
            You will be able to contact them further after you checkout."}
          </UIContainer>
        </UIForm.Field>

        <UIForm.Field>
          <Control.text
            model="forms.rsvp.servings"
            validators={{
              isRequired,
              isPositiveNumber,
              maxServings: (val) => val <= meal.servings_available
            }}
            component={UIForm.Input}
            mapProps={{
              label: "Servings",
              error: requiredError,
              placeholder: "Enter a number",
            }}
          />
          <UIContainer fluid>
            {"Enter the number of servings you'd like to buy.\
            The amount in one serving is specified on the meal page."}
          </UIContainer>
        </UIForm.Field>

        <UIForm.Field error={modelError(form.delivery_method)}>
        <Control
          model="forms.rsvp.delivery_method"
          validators={{
            isRequired,
          }}
          component={Dropdown}
          mapProps={{
            model: "forms.rsvp.delivery_method",
            placeholder: "Delivery Method",
            options: deliveryOptions,
            label: "Delivery Method"
          }}
        />
          <UIContainer fluid>
            {"Select from the delivery options the chef has made available.\
            You will be able to coordinate specific logistics with the chef after purchase."}
          </UIContainer>
        </UIForm.Field>


      </UIForm.Field>
    )
  }
}

export default RsvpDetailsSection
