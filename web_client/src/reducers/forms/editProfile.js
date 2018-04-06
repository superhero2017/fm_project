/* eslint-disable no-unused-vars */
import moment from 'moment'
import {
  SET_INITIAL_EDIT_PROFILE_FORM_STATUS,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_REQUEST_SUCCESS,
  EDIT_PROFILE_REQUEST_ERROR,
  RESET_EDIT_PROFILE_FORM,
  EDIT_PROFILE_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  work: "",
  bio: "",
  dob: "",
  dob_year: "",
  dob_month: "",
  dob_date: "",
  school: "",
  town: "",
  image: null,
}

const editProfileForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action
  switch (type) {

    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
      }

    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case EDIT_PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case EDIT_PROFILE_REQUEST_ERROR:
      return {
        ...state,
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

export { editProfileForm }
