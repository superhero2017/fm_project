/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { redirectGenerator } from '../lib/routing'
import { apiPost, } from '../lib/api'
import { getToken } from '../selectors'
import {
  NEW_MEAL_REQUESTING,
  NEW_MEAL_REQUEST_SUCCESS,
  NEW_MEAL_REQUEST_ERROR,
} from '../constants'

import { getMealsUrl, getMealPath, } from '../urls'

import {
  newMealRequestSuccess,
  newMealRequestError,
} from '../actions/'


// This will be run when the NEW_MEAL_REQUESTING Action is found by the watcher
function* newMealFlow(action) {
  try {
    console.log("in newMealflow")
    const { payload } = action

    console.log("Neww Meal saga");
    console.log(payload);
    // is yield necessary??
    const token = yield select(getToken)
    const response = yield call(apiPost, getMealsUrl(), payload, token)
    const res = yield put(newMealRequestSuccess(response))
    // const { id } = res.payload.meal
    // Should I wait until I know the meal has been loaded?
    // yield call(redirectGenerator, getMealPath(id))
  } catch (error) {
    yield put(newMealRequestError(error))
  }

}

// Watches for the NEW_MEAL_REQUESTING action type
// When it gets it, it will call newMealFlow()
// WITH the action we dispatched
function* newMealWatcher () {
  yield takeLatest(NEW_MEAL_REQUESTING, newMealFlow)
}

export default newMealWatcher
