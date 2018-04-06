/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { redirectGenerator } from '../lib/routing'
import { apiPost, } from '../lib/api'
import { getToken } from '../selectors'
import {
  CHEF_APPLY_REQUEST,
  CHEF_APPLY_REQUEST_SUCCESS,
  CHEF_APPLY_REQUEST_ERROR,
} from '../constants'

import {
  getChefApplicationUrl,
  getChefApplicationPath,
} from '../urls'

import {
  chefApplyRequestSuccess,
  chefApplyRequestError,
} from '../actions/'


// This will be run when the NEW_MEAL_REQUESTING Action is found by the watcher
function* chefApplicationFlow(action) {
  try {
    const { payload } = action

    console.log("chef application saga");
    console.log(payload);
    // is yield necessary??
    const token = yield select(getToken)
    const response = yield call(
      apiPost,
      getChefApplicationUrl(),
      payload,
      token,
    )
    const res = yield put(chefApplyRequestSuccess())
    // const { id } = res.payload.meal
    // Should I wait until I know the meal has been loaded?
    // yield call(redirectGenerator, getMealPath(id))
  } catch (error) {
    yield put(chefApplyRequestError(error))
  }
}

// Watches for the NEW_MEAL_REQUESTING action type
// When it gets it, it will call newMealFlow()
// WITH the action we dispatched
function* chefApplicationWatcher () {
  yield takeLatest(CHEF_APPLY_REQUEST, chefApplicationFlow)
}

export default chefApplicationWatcher
