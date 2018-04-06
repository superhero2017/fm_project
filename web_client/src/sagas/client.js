/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { apiGet, apiDelete, apiPut, } from '../lib/api'
import { getToken, getProfile, } from '../selectors'
import {
  CLIENT_PROFILE_REQUEST,
  EDIT_PROFILE_REQUEST,
} from '../constants'

import {
  getProfileUrl,
} from '../urls'

import {
  getCurrentUserId
} from '../selectors'

import {
  clientProfileRequestSuccess,
  clientProfileRequestError,
  editProfileRequestSuccess,
  editProfileRequestError,
} from '../actions/'


// This will be run when the MEAL_REQUEST Action is found by the watcher
// TODO: this is a naive approach that always requests the profile
// should check to see if outdated or something first
function * clientProfileRequestFlow (action) {
  try {
    const id = yield select(getCurrentUserId)
    const token = yield select(getToken)
    const profile = yield call(apiGet, getProfileUrl(id), token)
    // console.log(profile)
    yield put(clientProfileRequestSuccess(profile))
  } catch (error) {
    yield put(clientProfileRequestError(error))
  }
}

function * editProfileFlow(action) {
  const { id, fields, } = action.payload
  // console.log(fields)
  try {
    const token = yield select(getToken)
    const profile = yield call(apiPut, getProfileUrl(id), fields, token)
    // console.log(meal)
    yield put(editProfileRequestSuccess(profile))
  } catch (error) {
    yield put(editProfileRequestError(error))

  }
}


function* clientWatcher () {
  // Does this array thing cancel other tasks when it finds one of them?
  // AKA are there any concurrency issues with this?
  yield [
    takeLatest(CLIENT_PROFILE_REQUEST, clientProfileRequestFlow),
    takeLatest(EDIT_PROFILE_REQUEST, editProfileFlow),
  ]
}

export default clientWatcher
