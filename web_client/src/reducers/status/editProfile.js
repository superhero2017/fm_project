/* eslint-disable no-unused-vars */
import {
  INIT_EDIT_PROFILE_FORM,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_REQUEST_SUCCESS,
  EDIT_PROFILE_REQUEST_ERROR,
  RESET_EDIT_PROFILE_FORM,
  EDIT_PROFILE_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  lastUpdated: null,
  requesting: true,
  successful: false,
  messages: [],
  errors: [],
}

const editProfileStatus = ( state = initialState, action ) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case INIT_EDIT_PROFILE_FORM:
      return {
        ...state,
        requesting: false,
        messages: [`Setting initial form state`],
        lastUpdated: Date.now(),
      }

    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'editng meal...', time: new Date() }],
      }

    case EDIT_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        messages: [{
          body: `Successfully edited profile`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    case EDIT_PROFILE_REQUEST_ERROR:
      return {
        ...state,
        errors: payload,
        messages: [],
        requesting: false,
      }

    case RESET_EDIT_PROFILE_FORM:
      return {
        ...initialState
      }

    case RRF_RESET:
      if (model === EDIT_PROFILE_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}
export { editProfileStatus }
