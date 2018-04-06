/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { apiGet, apiDelete, apiPut, } from '../lib/api'
import { getToken } from '../selectors'
import {
  MEAL_REQUEST,
  MEALS_REQUESTING,
  DELETE_MEAL_REQUEST,
  EDIT_MEAL_REQUEST,
} from '../constants'

import {
  getMealUrl,
  getMealsUrl,
} from '../urls'

import {
  mealRequestSuccess,
  mealRequestError,
  mealsRequestSuccess,
  mealsRequestError,
  deleteMealRequestSuccess,
  deleteMealRequestError,
  editMealRequestSuccess,
  editMealRequestError,
} from '../actions/'


// This will be run when the MEAL_REQUEST Action is found by the watcher
function * mealRequestFlow (action) {
  const { id } = action.payload
  try {
    const token = yield select(getToken)
    const meal = yield call(apiGet, getMealUrl(id), token)
    console.log(meal)
    yield put(mealRequestSuccess(meal))
  } catch (error) {
    yield put(mealRequestError(error))
  }
}
// This will be run when the MEALS_REQUESTING
// Action is found by the watcher
function * mealsRequestFlow (action) {
  try {
    const token = yield select(getToken)
    const meals = yield call(apiGet, getMealsUrl(), token)
    yield put(mealsRequestSuccess(meals))
  } catch (error) {
    // if the api call fails, it will "put" the MEALS_ERROR
    // into the dispatch along with the error.
    yield put(mealsRequestError(error))
  }
}

function * deleteMealFlow(action) {
  const { id, ...fields } = action.payload

  try {
    const token = yield select(getToken)
    const response = yield call(apiDelete, getMealUrl(id), token)
    // console.log(response);
    yield put(deleteMealRequestSuccess(id))
  } catch (error) {
    yield put(deleteMealRequestError())
  }
}

function * editMealFlow(action) {
  const { id, fields, } = action.payload
  // console.log(fields)
  try {
    const token = yield select(getToken)
    const meal = yield call(apiPut, getMealUrl(id), fields, token)
    // console.log(meal)
    yield put(editMealRequestSuccess(meal))
  } catch (error) {
    yield put(editMealRequestError(error))

  }
}

function* mealsWatcher () {
  // Does this array thing cancel other tasks when it finds one of them?
  // AKA are there any concurrency issues with this?
  yield [
    takeLatest(MEALS_REQUESTING, mealsRequestFlow),
    takeLatest(MEAL_REQUEST, mealRequestFlow),
    takeLatest(DELETE_MEAL_REQUEST, deleteMealFlow),
    takeLatest(EDIT_MEAL_REQUEST, editMealFlow),
  ]
}

export default mealsWatcher
