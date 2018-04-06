/* eslint-disable */
import {
  CLIENT_PROFILE_REQUEST,
  CLIENT_PROFILE_REQUEST_SUCCESS,
  CLIENT_PROFILE_REQUEST_ERROR,
  EDIT_PROFILE_REQUEST_SUCCESS,
  CUSTOMER_REQUEST_SUCCESS,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_UPDATE_SUCCESS,
  LOGOUT_REQUEST,
} from '../constants'

const initialState = {
  profile: null,
  customer: null,
  account: null,
  status: {
    lastUpdated: null,
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
  }
}

const clientReducer = function (state = initialState, action) {
  const { type, payload, error, meta, } = action
  switch (type) {
    case CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        status: {
          ...status,
          requesting: true,
          successful: false,
          messages: [`Requesting client profile`],
          errors: [],
        },
      }

    case CLIENT_PROFILE_REQUEST_SUCCESS:
    // console.log("reducing client profile req success");
      const { profile } = payload
      return {
        ...state,
        profile,
        status: {
          ...status,
          requesting: false,
          successful: true,
          lastUpdated: meta.receivedAt,
          errors: [],
        }
      }

    case CLIENT_PROFILE_REQUEST_ERROR:
      // console.log(payload)
      return {
        ...state,
        status: {
          ...status,
          requesting: false,
          successful: false,
          messages: [],
          errors: state.status.errors.concat([{
            body: payload.error.toString(),
            time: new Date(),
          }]),
        }
      }

    case EDIT_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      }

    case CUSTOMER_CREATE_SUCCESS:
    case CUSTOMER_REQUEST_SUCCESS:
    case CUSTOMER_UPDATE_SUCCESS:
      console.log("got the customer", payload.customer);
      return {
        ...state,
        customer: payload.customer,
      }

    case LOGOUT_REQUEST:
      return initialState


    default:
      return state
  }
}

export { clientReducer }

export const getClientProfile = (state) => {
  return state.profile
}

export const getClientCustomer = (state) => {
  return state.customer
}

// export const getMealsWithUserId = (state, id) => {
//   console.log("get meals with owner id " + id)
//   return state.meals.filter((meal) => meal.owner.toString() === id.toString())
// }
