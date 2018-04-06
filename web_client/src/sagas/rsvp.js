/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { getToken } from '../selectors'
import { apiPost, } from '../lib/api'
import {
  RSVP_REQUESTING,
  RSVPS_URL,
} from '../constants'
import { getRsvpsUrl, } from '../urls'
import {
  rsvpRequestSuccess,
  rsvpRequestError,
} from '../actions/'

// This will be run when the NEW_MEAL_REQUESTING
// Action is found by the watcher
function* rsvpFlow(action) {
  try {
    console.log("in rsvpflow")
    const { payload } = action
    // console.log(data)

    // is yield necessary??
    const token = yield select(getToken)

    const response = yield call(apiPost, getRsvpsUrl(), payload, token)

    yield put(rsvpRequestSuccess(response))
  } catch (error) {
    console.log(error)
    yield put(rsvpRequestError(error))
  }

}

function* rsvpWatcher () {
  yield takeLatest(RSVP_REQUESTING, rsvpFlow)
}

export default rsvpWatcher
