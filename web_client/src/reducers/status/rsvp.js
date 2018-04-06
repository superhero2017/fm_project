/* eslint-disable no-unused-vars */
import {
  RSVP_REQUESTING,
  RSVP_REQUEST_SUCCESS,
  RSVP_REQUEST_ERROR,
  STRIPE_CUSTOMER_TOKEN_REQUEST,
  STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS,
  STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR,
  RSVP_NEXT_BUTTON_CLICKED,
  RSVP_BACK_BUTTON_CLICKED,
  RSVP_CARD_VALIDITY_CHANGED,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_ERROR,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_ERROR,
  RSVP_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  stage: 0,
  cardIsValid: false,
  billingStage: {
    requesting: false,
    succsssful: false,
    errors: [],
  }
}

const rsvpStatus = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action
  const { stage } = state

  switch (type) {
    case RSVP_REQUESTING:
      console.log("RSVP_REQUESTING reducer")
      const { rsvp, } = payload
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: 'Submitting rsvp...',
          time: new Date()
        }],
        errors: [],
      }

    case STRIPE_CUSTOMER_TOKEN_REQUEST:
      // console.log("RSVP_REQUESTING reducer")
      // const { rsvp, } = payload
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: 'sending stripe token...',
          time: new Date()
        }],
        errors: [],
      }
    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case RSVP_REQUEST_SUCCESS:
      console.log('returning rsvp success')
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully submitted rsvp`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    case STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully submitted stripe token`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
        stage: 2,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case RSVP_REQUEST_ERROR:
      return {
        ...state,
        errors: payload,
        messages: [],
        requesting: false,
        successful: false,
      }

    case STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR:
      return {
        ...state,
        errors: [payload.message],
        messages: [],
        requesting: false,
        successful: false,
      }

    case RSVP_NEXT_BUTTON_CLICKED:
      if (stage < 2) {
        return {
          ...state,
          stage: stage + 1,
          errors: [],
        }
      }
      return {
        ...state
      }

    case RSVP_BACK_BUTTON_CLICKED:
      if (stage > 0) {
        return {
          ...state,
          stage: stage - 1,
          errors: [],
        }
      }
      return {
        ...state
      }

    case RSVP_CARD_VALIDITY_CHANGED:
      const { valid } = payload
      return {
        ...state,
        cardIsValid: valid,
      }

    case CUSTOMER_CREATE_REQUEST:
    case CUSTOMER_UPDATE_REQUEST:
      return {
        ...state,
        billingStage: {
          ...state.billingStage,
          requesting: true,
          successful: false,
          errors: []
        }
      }

    case CUSTOMER_CREATE_SUCCESS:
    case CUSTOMER_UPDATE_SUCCESS:
      return {
        ...state,
        stage: 2,
        billingStage: {
          ...state.billingStage,
          requesting: false,
          successful: true,
        }
      }

    case CUSTOMER_CREATE_ERROR:
    case CUSTOMER_UPDATE_ERROR:
      return {
        ...state,
        billingStage: {
          ...state.billingStage,
          requesting: false,
          successful: false,
          errors: [payload.message]
        }
      }

    case RRF_RESET:
      if (model === RSVP_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { rsvpStatus }
