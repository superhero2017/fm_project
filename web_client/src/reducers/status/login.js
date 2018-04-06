/* eslint-disable no-unused-vars */
import {
  LOGIN_REQUESTING,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  LOGOUT_REQUEST,
  RESET_LOGIN_FORM,
  RRF_RESET,
  LOGIN_FORM,
} from '../../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const loginStatus = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case LOGIN_REQUESTING:
      return {
        ...state,
        requesting: true,
        messages: [{ body: 'Logging in...', time: new Date() }],
      }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        messages: [{
          body: `Successfully logged in`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        errors: payload,
        messages: [],
        requesting: false,
      }

    // Make sure nothing looks like it is loading when logout occurs
    case LOGOUT_REQUEST:
      // console.log("LOGOUT REQUEST REDUCER")
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: ["You've successfully logged out!"],
      }
    case RRF_RESET:
      if (model === LOGIN_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { loginStatus }
