/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { apiGet, apiDelete, apiPut, } from '../lib/api'
import { getToken, getProfile, } from '../selectors'
import {
  STRIPE_CUSTOMER_TOKEN_REQUEST,
} from '../constants'

import {
  stripeCustomerTokenRequestSuccess,
  stripeCustomerTokenRequestError,
  customerCreate,
  customerUpdate,
} from '../actions/'

      // .then(({token}) => {
      //   console.log('Received Stripe token:', token);
      //   // this.setState({stage: stage + 1})
      // })
      // .catch((e) => {
      //   console.log('got error', e);
      // });

const getStripeToken = (stripe, extraDetails, type) => {
  return stripe.createToken({
    type,
    extraDetails,
  })
  .then((response) => {
    // console.log('Received Stripe promise resolved');
    const { token } = response
    // console.log(token);
    // console.log(response);
    if (response.error) {
      console.log(response.error);
      // throw new Error(response.error.message)
      throw response.error
    }
    return token
  })
}

// This will be run when the MEAL_REQUEST Action is found by the watcher
// TODO: this is a naive approach that always requests the profile
// should check to see if outdated or something first
function* stripeCustomerTokenRequestFlow(action) {
  try {
    console.log("In stripe saga");
    const { stripe, extraDetails } = action.payload
    // const id = yield select(getCurrentUserId)
    const token = yield select(getToken)

    const stripeToken = yield call(
      getStripeToken,
      stripe,
      extraDetails, 
      'card'
    )
    console.log("token in generator: ", token);
    yield put(stripeCustomerTokenRequestSuccess(stripeToken))

    // Got token, now we need to create or modify the customer profile
    if (true) {
      yield put(customerCreate(stripeToken))
    } else {
      yield put(customerUpdate(stripeToken))
    }

  } catch (error) {
    yield put(stripeCustomerTokenRequestError(error))
  }
}

// function * editProfileFlow(action) {
//   const { id, fields, } = action.payload
//   // console.log(fields)
//   try {
//     const token = yield select(getToken)
//     const profile = yield call(apiPut, getProfileUrl(id), fields, token)
//     // console.log(meal)
//     yield put(editProfileRequestSuccess(profile))
//   } catch (error) {
//     yield put(editProfileRequestError(error))
//
//   }
// }


function* stripeWatcher () {
  // Does this array thing cancel other tasks when it finds one of them?
  // AKA are there any concurrency issues with this?
  yield [
    takeLatest(STRIPE_CUSTOMER_TOKEN_REQUEST, stripeCustomerTokenRequestFlow),
    // takeLatest(EDIT_PROFILE_REQUEST, editProfileFlow),
  ]
}

export default stripeWatcher
