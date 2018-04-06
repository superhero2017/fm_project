/* global Stripe */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, } from 'react-router'
import { actions, Control, Errors, Form, } from 'react-redux-form'
import { replace, push, } from 'react-router-redux'
import { injectStripe } from 'react-stripe-elements';
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
  getMealById, getCurrentUserId, getClientCustomer,
} from '../../selectors'
import { getMealPath, } from '../../urls'
import {
  isRequired,
  isNumber,
  isPositiveNumber,
  requiredError,
} from '../../lib/validators'
import {
  rsvpRequest, stripeCustomerTokenRequest,
  rsvpNextButtonClicked, rsvpBackButtonClicked,
  rsvpCardValidityChanged,
  customerCreateRequest, customerUpdateRequest
} from '../../actions/'

import CheckoutStep from '../../components/CheckoutStep'
import RsvpDetailsSection from '../../components/formSections/RsvpDetailsSection'
import RsvpBillingSection from '../../components/formSections/RsvpBillingSection'
import RsvpButtonSection from '../../components/formSections/RsvpButtonSection'
import RsvpConfirmSection from '../../components/formSections/RsvpConfirmSection'

const checkoutStages = [
  location.pathname,
  location.pathname + '/billing',
  location.pathname + '/confirm',
]

const getDeliveryOptions = (meal) => {
  var options = []
  if (meal.accept_delivery) {
    options.push({ key: 1, text: 'Delivery', value: 'delivery' })
  }
  if (meal.accept_dine_in) {
    options.push({ key: 2, text: 'Dine-In', value: 'dine_in' })
  }
  if (meal.accept_pickup) {
    options.push({ key: 3, text: 'Pickup', value: 'pickup'})
  }
  return options
}

// function setOutcome(result) {
//
//       if (result.token) {
//         console.log("got a token");
//         console.log(result.token);
//       } else {
//         console.log("got an error");
//         console.log(result.error);
//       }
// }

class RsvpForm extends Component {
  static propTypes = {
    meal: PropTypes.object,
    userId: PropTypes.number,
    status: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  handleSubmit = (vals) => {
    const { dispatch, meal, } = this.props
    dispatch(rsvpRequest(vals, meal))
  }

  setUseExistingCard = (using) => {
    const { dispatch, form, } = this.props
    dispatch(actions.change(
      'forms.rsvp.useExistingCard',
      using
    ))
  }

  handleNextClick = (e) => {
    e.preventDefault()
    // console.log(e);
    // const { stage } = this.state
    const { dispatch, form, stripe, status, customer, } = this.props
    const { stage } = status
    console.log("Handling next click with stage", stage);
    // We have to submit to stripe when next is clicked on the billing section
    if (stage === 1) {
      // Call stripe if they put in a new card
      if (!form.useExistingCard.value) {
        var extraDetails = {
          // name: form.nameOnCard.value,
        }
        // We have to either update the customer or create a new one
        if (!customer) {
          dispatch(customerCreateRequest(stripe, extraDetails))
        } else {
          dispatch(customerUpdateRequest(stripe, extraDetails, customer.id))
        }
      } else {
        // Move to the next step if they used existing card
        dispatch(rsvpNextButtonClicked())
      }

    } else {
      // Move to the next step if we're on first stage
      dispatch(rsvpNextButtonClicked())
    }
  }

  handleBackClick = (e) => {
    e.preventDefault()
    this.props.dispatch(rsvpBackButtonClicked())
  }

  handleCancelClick = () => {
    const { dispatch, meal, } = this.props
    dispatch(push(getMealPath(meal.id)))
  }

  // Send an action saying the validity changed when it switches
  // from 'complete' to 'incomplete' (cf. the stripe docs)
  handleCardChange = (e) => {
    const { dispatch, status, } = this.props
    const { cardIsValid } = status
    // console.log("handle card change", e);
    const nowValid = e.complete
    // Only send the action when the validity changes
    if (nowValid && !cardIsValid) {
      dispatch(rsvpCardValidityChanged(nowValid))
    }
    else if (!nowValid && cardIsValid) {
      dispatch(rsvpCardValidityChanged(nowValid))
    }
  }

  nextDisabled = () => {
    const { form, status } = this.props
    const { stage, cardIsValid, } = status
    if (stage === 0) {
      return !form.servings.valid || !form.delivery_method.valid
    }
    if (stage === 1) {
      return !form.useExistingCard.value && !cardIsValid
    }
  }

  // TODO: actually disable submit
  submitDisabled = () => {
    const { status } = this.props
    // return status.successful
    return false

  }

  getStripeToken = () => {
    console.log("trying to get stripe token");
    const { form, stripe, } = this.props
    // var extraDetails = {
    //   name: form.card_name.value,
    // }
    console.log(stripe);
    stripe.createToken({type: 'card', name: form.card_name.value})
    .then(({token}) => {
      console.log("promise resolved");
      console.log('Received Stripe token:', token);

    })
    .catch((e) => {
      console.log('got error', e);
    });

  }

  renderStage = () => {
    // const { deliveryOptions, } = this.state
    const { meal, form, status, deliveryOptions, customer, } = this.props
    const { stage } = status
    console.log("Rendering stage number: ",stage)
    const props = {
      meal,
      form,
      deliveryOptions,
    }
    if (stage === 0) {
      return (
        <RsvpDetailsSection { ...props } />
      )
    }
    if (stage === 1) {
      return (
        <RsvpBillingSection
          customer={customer}
          onCardChange={this.handleCardChange}
          setUseExistingCard={this.setUseExistingCard}
          form={form}
        />
      )
    }
    if (stage === 2) {
      return (
        <RsvpConfirmSection
          meal={meal}
          form={form}
          deliveryOptions={deliveryOptions}
        />
      )
    }
  }

  constructor(props) {
    super(props)
    const { meal, userId, dispatch, location, } = props
    if (meal.owner === userId) {
      dispatch(replace(getMealPath(meal.id)))
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(actions.reset("forms.rsvp"))
  }

  // Don't use Control.button for the submission! It Causes errors
  render() {
    const {
      requesting,
      successful,
      messages,
      errors,
      stage,
      billingStage,
    } = this.props.status

    const { meal } = this.props


    const success = stage === 1 ? billingStage.successful : successful
    const loading = stage === 1 ? billingStage.requesting : requesting

    let error
    if (stage === 1) {
      error = billingStage.errors && billingStage.errors.length > 0
    } else {
      error = errors && errors.length > 0
    }
    let errorList
    if (stage === 1) {
      errorList = billingStage.errors
    } else {
      errorList = errors
    }

    return (
      <div>
        <CheckoutStep stage={stage} />

        <UIForm
          success={success}
          loading={loading}
          error={error}
          as={Form}
          model="forms.rsvp"
          validators={{
            // '': {
            //   servings_max: (vals) => vals.servings <== servings_available
            // },
          }}
          validateOn="change"
          onSubmit={v => this.handleSubmit(v)}
        >

          {this.renderStage()}

          <UIMessage
            success
            header="You've signed up for the meal!"
          />
          <UIMessage
            error
            list={errorList}
          />

          <RsvpButtonSection
            stage={stage}
            handleBackClick={this.handleBackClick}
            handleNextClick={this.handleNextClick}
            handleCancelClick={this.handleCancelClick}
            handleSubmit={this.handleSubmit}
            nextDisabled={this.nextDisabled}
            submitDisabled={this.submitDisabled}
          />
        </UIForm>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  // const id = ownProps.match.params.id
  // const meal = state.meals.items[id]
  const meal = getMealById(state, ownProps.match.params.id)
  // console.log(meal)
  const userId = getCurrentUserId(state)
  const customer = getClientCustomer(state)
  // console.log(userId)
  const deliveryOptions = getDeliveryOptions(meal)

  return {
    status: state.status.rsvp,
    form: state.forms.forms.rsvp,
    meal,
    deliveryOptions,
    userId,
    customer,
  }
}

export default injectStripe(withRouter(connect(mapStateToProps)(RsvpForm)))
