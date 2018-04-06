/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import {
  take, takeLatest, fork, cancel, call, put,
  cancelled, select, race,
} from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { handleApiErrors } from '../lib/api-errors'
import { apiPost, } from '../lib/api'
import { decode } from '../lib/jwt'
import { redirectGenerator } from '../lib/routing'
import { getRedirectPathname } from '../selectors'

import {
  LOGIN_REQUESTING,
  SIGNUP_REQUESTING,
  LOGOUT_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
} from '../constants'

import {
  getLoginUrl,
  getFbLoginUrl,
  getSignupUrl,
} from '../urls'

import {
  postAuthActions
} from '../lib/post-auth'

import {
  setToken,
  unsetToken,
  loginRequestSuccess,
  loginRequestError,
  logoutRequest,
  signupRequestSuccess,
  signupRequestError,
  clientProfileRequest,
  customerRequest,
} from '../actions/'

// In the future will need to clear out other stuff like data
function * logoutFlow () {
  while (true) {
    // Block until we get a LOGOUT_REQUEST action
    yield take(LOGOUT_REQUEST)
    console.log("just received logout request")
    // yield put(logoutRequest())    // reducers will listen to this to clean up stuff
    yield call(redirectGenerator, '/')
    yield put(unsetToken())   // Clear the token from the store and localStorage
  }
}

// This will be run when the LOGIN_REQUESTING
// Action is found by the watcher
function * loginFlow () {
  while (true) {
    const { type, payload, } = yield take(
      [LOGIN_REQUESTING, FACEBOOK_LOGIN_REQUEST]
    )
    const url = type === LOGIN_REQUESTING ?
      getLoginUrl() : getFbLoginUrl()

    try {
      let winner = yield race({
        token: call(apiPost, url, payload),
        logout: take(LOGOUT_REQUEST)
      })
      // We logged in, now request any client info we might
      // need
      if (winner.token) {
        yield put(setToken(winner.token))
        yield put(loginRequestSuccess())
        // Call the post auth actions
        for (var i = 0; i < postAuthActions.length; i++) {
          // console.log(a);
          yield put(postAuthActions[i]())
        }
        // yield put(clientProfileRequest())
        // Get the billing info for this user (if any)
        // yield put(customerRequest())
        yield call(redirectGenerator)
      }
    }
    catch (error) {
      yield put(loginRequestError(error))
    }
  }
}

function * signupFlow() {
  while (true) {
    const { type, payload, } = yield take(SIGNUP_REQUESTING)

    try {
      // Do I need a race here too?
      const token = yield call(apiPost, getSignupUrl(), payload)
      // sets the token in local storage and the reducer adds it to state
      yield put(setToken(token))
      yield put(signupRequestSuccess())
      for (var a in postAuthActions) {
        yield put(a)
      }
      yield call(redirectGenerator)
    } catch (error) {
      yield put(signupRequestError(error))
    }
  }
}

// Watches for the LOGIN_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function * authWatcher () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(signupFlow)
}

export default authWatcher
