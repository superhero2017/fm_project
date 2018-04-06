/* eslint-disable no-unused-vars */
import {
  NEW_MEAL_REQUESTING,
  NEW_MEAL_REQUEST_SUCCESS,
  NEW_MEAL_REQUEST_ERROR,
  RESET_NEW_MEAL_FORM,
  NEW_MEAL_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const newMealStatus = ( state = initialState, action ) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case NEW_MEAL_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Submitting new meal...', time: new Date() }],
        errors: [],
      }

    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case NEW_MEAL_REQUEST_SUCCESS:
      // console.log(payload.meal);
      const { id } = payload.meal
      return {
        ...state,
        errors: [],
        messages: [{
          body: `Successfully submitted meal`,
          time: new Date(),
        }],
        requesting: false,
        successful: true,
      }

    // reset the state but with errors!
    // the error payload returned is actually far
    // more detailed, but we'll just stick with
    // the base message for now

    case NEW_MEAL_REQUEST_ERROR:
      // console.log(payload);
      return {
        ...state,
        errors: payload,
        messages: [],
        requesting: false,
      }

    case RESET_NEW_MEAL_FORM:
      return {
        ...initialState,
      }

    case RRF_RESET:
      if (model === NEW_MEAL_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { newMealStatus }
