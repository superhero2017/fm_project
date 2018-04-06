/* eslint-disable */
import {
  STRIPE_CUSTOMER_TOKEN_REQUEST,
  STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS,
  STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR,
} from '../constants'

const initialState = {
  customerToken: undefined,
  chefToken: undefined,
}

const stripeReducer = function (state = initialState, action) {
  const { type, payload, error, meta, } = action
  switch (type) {
    case STRIPE_CUSTOMER_TOKEN_REQUEST:
      return {
        ...state,
      }

    case STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS:
    // console.log("reducing client profile req success");
      const { token } = payload
      return {
        ...state,
        customerToken: token,
      }

    case STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR:
      // console.log(payload)
      return {
        ...state,
      }

    default:
      return state
  }
}

export { stripeReducer }

// export const getClientProfile = (state) => {
//   return state.profile
// }
