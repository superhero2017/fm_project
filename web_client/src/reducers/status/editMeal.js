/* eslint-disable no-unused-vars */
import {
  EDIT_MEAL_REQUEST,
  EDIT_MEAL_REQUEST_SUCCESS,
  EDIT_MEAL_REQUEST_ERROR,
  EDIT_MEAL_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const editMealStatus = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case EDIT_MEAL_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'editng meal...', time: new Date() }],
        errors: [],
      }

    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case EDIT_MEAL_REQUEST_SUCCESS:
      const { id } = payload.meal
      console.log("adding new meal id to state")
      console.log(payload.meal);
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully edited meal`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now
    case EDIT_MEAL_REQUEST_ERROR:
      return {
        ...state,
        errors: payload,
        messages: [],
        requesting: false,
        successful: false,
      }

    case RRF_RESET:
      if (model === EDIT_MEAL_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { editMealStatus }
