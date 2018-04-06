/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { apiGet, apiDelete, apiPut, } from '../lib/api'
import { getToken, getProfile, } from '../selectors'
import {
  PROFILE_REQUEST,
} from '../constants'

import {
  getProfileUrl,
} from '../urls'

import {
  profileRequestSuccess,
  profileRequestError,
} from '../actions/'


// This will be run when the MEAL_REQUEST Action is found by the watcher
function * profileRequestFlow (action) {
  const { id } = action.payload
  try {
    const token = yield select(getToken)
    const profile = yield call(apiGet, getProfileUrl(id), token)
    console.log(profile)
    yield put(profileRequestSuccess(profile))
  } catch (error) {
    yield put(profileRequestError(error))
  }
}

// // This will be run when the MEALS_REQUESTING
// // Action is found by the watcher
// function * mealsRequestFlow (action) {
//   try {
//     const token = yield select(getToken)
//     const meals = yield call(apiGet, getMealsUrl(), token)
//     yield put(mealsRequestSuccess(meals))
//   } catch (error) {
//     // if the api call fails, it will "put" the MEALS_ERROR
//     // into the dispatch along with the error.
//     yield put(mealsRequestError(error))
//   }
// }
//
// function * deleteMealFlow(action) {
//   const { id, ...fields } = action.payload
//
//   try {
//     const token = yield select(getToken)
//     const response = yield call(apiDelete, getMealUrl(id), token)
//     // console.log(response);
//     yield put(deleteMealRequestSuccess(id))
//   } catch (error) {
//     yield put(deleteMealRequestError())
//   }
// }
//
// function * editMealFlow(action) {
//   const { id, fields, } = action.payload
//   // console.log(fields)
//   try {
//     const token = yield select(getToken)
//     const meal = yield call(apiPut, getMealUrl(id), fields, token)
//     // console.log(meal)
//     yield put(editMealRequestSuccess(meal))
//   } catch (error) {
//     yield put(editMealRequestError(error))
//
//   }
// }

function* profileWatcher () {
  // Does this array thing cancel other tasks when it finds one of them?
  // AKA are there any concurrency issues with this?
  yield [
    takeLatest(PROFILE_REQUEST, profileRequestFlow),
    // takeLatest(MEALS_REQUESTING, mealsRequestFlow),
    // takeLatest(DELETE_MEAL_REQUEST, deleteMealFlow),
    // takeLatest(EDIT_MEAL_REQUEST, editMealFlow),
  ]
}

export default profileWatcher
