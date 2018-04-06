/* eslint-disable no-unused-vars*/
import { getDefaultProfilePhoto, } from '../urls'

import {
  PROFILE_REQUEST, PROFILE_REQUEST_SUCCESS, PROFILE_REQUEST_ERROR,
  CLIENT_PROFILE_REQUEST_SUCCESS,
} from '../constants'

const initialState = {
  profiles: [],
  status: {
    lastUpdated: null,
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
  }
}

const profilesReducer = function (state = initialState, action) {
  const { type, payload, error, meta, } = action
  let meal, meals
  switch (type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        status: {
          ...status,
          requesting: true,
          successful: false,
          messages: [`Requesting profile with id ${payload.id}`],
          errors: [],
        },
      }

    case PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        profiles: state.profiles.concat(payload.profile),
        status: {
          ...status,
          requesting: false,
          successful: true,
          lastUpdated: meta.receivedAt,
          errors: [],
        }
      }

    case PROFILE_REQUEST_ERROR:
      // console.log(payload)
      return {
        ...state,
        status: {
          ...status,
          requesting: false,
          successful: false,
          messages: [],
          errors: state.status.errors.concat([{
            body: payload.error.toString(),
            time: new Date(),
          }]),
        }
      }

    case CLIENT_PROFILE_REQUEST_SUCCESS:
      const { profile } = payload
      return {
        ...state,
        profiles: state.profiles.concat(profile),
        status: {
          ...status,
          requesting: false,
          successful: true,
          lastUpdated: meta.receivedAt,
          errors: [],
        }
      }

      // return {
      //   ...state,
      //   profile,
      //   status: {
      //     ...status,
      //     requesting: false,
      //     successful: true,
      //     lastUpdated: meta.receivedAt,
      //     errors: [],
      //   }
      // }
    // case PROFILES_REQUESTING:
    //   return {
    //     ...state,
    //     status: {
    //       ...status,
    //       requesting: true,
    //       successful: false,
    //       messages: [{
    //         body: 'Fetching Meals...',
    //         time: new Date()
    //       }],
    //     },
    //   }
    //
    // // reset the state and add a body message of success!
    // // remember our successful returned payload will be:
    // // {"email": "of the new user", "id": "of the user"}
    // case PROFILES_REQUEST_SUCCESS:
    //   const { response } = payload
    //   // // Get meals into a dictionary keyed by meal pk
    //   // const items = meals.results.reduce((acc, cur, i) => {
    //   //   acc[cur.id] = cur
    //   //   return acc
    //   // }, {})
    //   // console.log(meals)
    //   return {
    //     ...state,
    //     meals: response.results,
    //     status: {
    //       ...status,
    //       requesting: false,
    //       successful: true,
    //       lastUpdated: meta.receivedAt,
    //       errors: []
    //     },
    //   }
    //
    // case PROFILES_REQUEST_ERROR:
    //   return {
    //     ...state,
    //     status: {
    //       ...status,
    //       requesting: false,
    //       successful: false,
    //       messages: [],
    //       errors: state.status.errors.concat([{
    //         body: payload.error.toString(),
    //         time: new Date(),
    //       }]),
    //     },
    //   }
    //
    // case NEW_PROFILE_REQUEST_SUCCESS:
    //   console.log("Adding new meal to meals state")
    //   return {
    //     ...state,
    //     meals: state.meals.concat(payload.meal),
    //   }
    //
    // case DELETE_PROFILE_REQUEST_SUCCESS:
    //   meals = state.meals.filter((meal) => {
    //     return meal.id !== payload.id
    //   })
    //   // console.log(meals)
    //   return {
    //     ...state,
    //     meals,
    //   }
    //
    // case EDIT_PROFILE_REQUEST_SUCCESS:
    //   console.log("TODO: Editing meal in meals state")
    //   meals = state.meals.map((meal) => {
    //     return meal.id === payload.meal.id ? payload.meal : meal
    //   })
    //
    //   return {
    //     ...state,
    //     meals,
    //   }

    default:
      return state
  }
}

export { profilesReducer }

export const getProfileById = (state, id) => {
  // console.log("get profile with id " + id)
  return state.profiles.filter((prof) => prof.id.toString() === id.toString())[0]
}

export const getProfPicById = (state, id) => {

  const prof = getProfileById(state, id)
  // console.log(prof);
  return prof && prof.image ? prof.image : getDefaultProfilePhoto()

}
