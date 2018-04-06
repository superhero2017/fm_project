/* eslint-disable no-unused-vars */
import {
  CHEF_APPLY_REQUEST_SUCCESS,
  CHEF_APPLICATION_FORM,
  RRF_RESET,
} from '../../constants'

const initialState = {
  about_yourself: "",
  safety_training: "0",
  safety_description: "",
  kitchen_image: null,
}

const chefApplicationForm = (state = initialState, action) => {
  const { type, payload, error, meta, model, } = action

  switch (type) {
    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case CHEF_APPLY_REQUEST_SUCCESS:
      // console.log(payload.meal);
      const { id } = payload.meal
      // console.log("adding new meal id to state")
      return {
        ...state,
        newMealId: id,
      }

    case RRF_RESET:
      if (model === CHEF_APPLICATION_FORM) {
        return { ...initialState, }
      }
      return state

    default:
      return state
  }
}

export { chefApplicationForm }
