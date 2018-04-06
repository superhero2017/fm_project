/* eslint-disable no-unused-vars */
import {
  EDIT_MEAL_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
}

const editMealForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    case RRF_RESET:
      if (model === EDIT_MEAL_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { editMealForm }
