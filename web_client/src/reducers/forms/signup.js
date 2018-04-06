/* eslint-disable no-unused-vars */
import {
  RESET_SIGNUP_FORM,
  SIGNUP_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  password1: "",
  password2: "",
}

const signupForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
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

export { signupForm }
