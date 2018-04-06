/* eslint-disable no-unused-vars */
import {
  SIGNUP_REQUESTING,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_ERROR,
  RESET_SIGNUP_FORM,
  SIGNUP_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const signupStatus = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case SIGNUP_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      }

    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case SIGNUP_REQUEST_SUCCESS:
      return {
        errors: [],
        messages: [{
          body: `Successfully created account`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case SIGNUP_REQUEST_ERROR:
      return {
        errors: payload,
        messages: [],
        requesting: false,
        successful: false,
      }

    case RESET_SIGNUP_FORM:
      return {
        ...initialState,
      }

    case RRF_RESET:
      if (model === SIGNUP_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { signupStatus }
