/* eslint-disable */
import {
  MEAL_REQUEST, MEAL_REQUEST_SUCCESS, MEAL_REQUEST_ERROR,
  MEALS_REQUESTING, MEALS_REQUEST_SUCCESS, MEALS_REQUEST_ERROR,
  NEW_MEAL_REQUEST_SUCCESS,
  DELETE_MEAL_REQUEST_SUCCESS,
  EDIT_MEAL_REQUEST_SUCCESS,
} from '../constants'

const initialState = {
  meals: [],
  status: {
    lastUpdated: null,
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
  }
}

const mealsReducer = function (state = initialState, action) {
  const { type, payload, error, meta, } = action
  let meal, meals
  switch (type) {
    case MEAL_REQUEST:
      return {
        ...state,
        status: {
          ...status,
          requesting: true,
          successful: false,
          messages: [`Requesting meal with id ${payload.id}`],
          errors: [],
        },
      }

    case MEAL_REQUEST_SUCCESS:
      return {
        ...state,
        meals: state.meals.concat(payload.meal),
        status: {
          ...status,
          requesting: false,
          successful: true,
          lastUpdated: meta.receivedAt,
          errors: [],
        }
      }

    case MEAL_REQUEST_ERROR:
      console.log(payload)
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

    case MEALS_REQUESTING:
      return {
        ...state,
        status: {
          ...status,
          requesting: true,
          successful: false,
          messages: [{
            body: 'Fetching Meals...',
            time: new Date()
          }],
        },
      }

    // reset the state and add a body message of success!
    // remember our successful returned payload will be:
    // {"email": "of the new user", "id": "of the user"}
    case MEALS_REQUEST_SUCCESS:
      const { response } = payload
      // // Get meals into a dictionary keyed by meal pk
      // const items = meals.results.reduce((acc, cur, i) => {
      //   acc[cur.id] = cur
      //   return acc
      // }, {})
      // console.log(meals)
      return {
        ...state,
        meals: response.results,
        status: {
          ...status,
          requesting: false,
          successful: true,
          lastUpdated: meta.receivedAt,
          errors: []
        },
      }

    case MEALS_REQUEST_ERROR:
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
        },
      }

    case NEW_MEAL_REQUEST_SUCCESS:
      console.log("Adding new meal to meals state")
      return {
        ...state,
        meals: state.meals.concat(payload.meal),
      }

    case DELETE_MEAL_REQUEST_SUCCESS:
      meals = state.meals.filter((meal) => {
        return meal.id !== payload.id
      })
      // console.log(meals)
      return {
        ...state,
        meals,
      }

    case EDIT_MEAL_REQUEST_SUCCESS:
      console.log("TODO: Editing meal in meals state")
      meals = state.meals.map((meal) => {
        return meal.id === payload.meal.id ? payload.meal : meal
      })

      return {
        ...state,
        meals,
      }

    default:
      return state
  }
}

export { mealsReducer }

export const getMealById = (state, id) => {
  console.log("get meal with id " + id)
  return state.meals.filter((meal) => meal.id.toString() === id)[0]
}

export const getMealsWithUserId = (state, id) => {
  console.log("get meals with owner id " + id)
  return state.meals.filter((meal) => meal.owner.toString() === id.toString())
}
