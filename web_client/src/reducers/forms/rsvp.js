/* eslint-disable no-unused-vars */
import {
  RSVP_REQUESTING,
  STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS,
  RSVP_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  comments: "",
  servings: "",
  delivery_method: "",
  // nameOnCard: "",
  useExistingCard: false,
}


const rsvpForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case RSVP_REQUESTING:
      // console.log("RSVP_REQUESTING reducer")
      const { rsvp, } = payload
      return {
        ...state,
        ...rsvp,
      }

    // case STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS:
    //   const { stripeToken } = payload
    //   console.log("in reducer, got stripe token", stripeToken);
    //   return {
    //     ...state,
    //     stripeToken,
    //   }

    // case RSVP_REQUEST_SUCCESS:
    //   console.log('returning rsvp success')
    //   return {
    //     ...state
    //   }

    // case RSVP_REQUEST_ERROR:
    //   return {
    //     ...state,
    //   }

    case RRF_RESET:
      if (model === RSVP_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { rsvpForm }
