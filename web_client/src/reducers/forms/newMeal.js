/* eslint-disable no-unused-vars */
import {
  NEW_MEAL_REQUEST_SUCCESS,
  NEW_MEAL_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  newMealId: null,
}

const newMealForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case NEW_MEAL_REQUEST_SUCCESS:
      // console.log(payload.meal);
      const { id } = payload.meal
      // console.log("adding new meal id to state")
      return {
        ...state,
        newMealId: id,
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

export { newMealForm }
