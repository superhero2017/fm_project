/* eslint-disable no-unused-vars */
import {
  LOGOUT_REQUEST,
  RRF_RESET,
  LOGIN_FORM,
} from '../../constants'

const initialState = {
  email: "",
  password: "",
}

const loginForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {

    // Make sure nothing looks like it is loading when logout occurs
    case LOGOUT_REQUEST:
      return { ...initialState, }

    case RRF_RESET:
      if (model === LOGIN_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { loginForm }
