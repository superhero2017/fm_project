/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
import { call, put, takeLatest, select, } from 'redux-saga/effects'
import { apiGet, apiPost, apiPut, } from '../lib/api'
import {
  getToken, getProfile, getCurrentUserId,
} from '../selectors'
import {
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_REQUEST,
} from '../constants'

import {
  getCustomerByIdPath,
  getCustomersUrl,
  getCustomerByIdUrl,
} from '../urls'

import {
  customerCreateSuccess,
  customerCreateError,
  customerUpdateSuccess,
  customerUpdateError,
  customerRequestSuccess,
  customerRequestError,
} from '../actions/'

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

// Form the request body for putting and posting to our api
const getBodyFromStripeToken = (stripeToken) => {
  const { id, card, } = stripeToken
  return {
      customer_token: id,
      billing_card_number: card.last4,
      billing_zip: card.address_zip,
      billing_type: card.brand,
      billing_expiry_month: card.exp_month,
      billing_expiry_year: card.exp_year,
      billing_country: card.country,
  }
}

// Get the customer object
function * customerRequestFlow (action) {
  const id = yield select(getCurrentUserId)
  console.log("Requesting customer details");
  try {
    const token = yield select(getToken)
    const customer = yield call(
      apiGet,
      getCustomerByIdUrl(id),
      token
    )
    console.log("Customer in saga", customer)
    yield put(customerRequestSuccess(customer))
  } catch (error) {
    yield put(customerRequestError(error))
  }
}

// Update the customer object using a new stripe token
function * customerUpdateFlow(action) {
  console.log("In customer update saga");
  const { stripe, extraDetails, id } = action.payload
  // const id = yield select(getCurrentUserId)

  try {
    // console.log("stripe token in generator: ", stripeToken);
    const stripeToken = yield call(
      getStripeToken,
      stripe,
      extraDetails,
      'card'
    )
    // Make the request body
    const body = getBodyFromStripeToken(stripeToken)
    // Got token, now we need to create the customer profile
    const token = yield select(getToken)

    // Make api call to our backend
    const customer = yield call(
      apiPut,
      getCustomerByIdUrl(id),
      body,
      token
    )
    console.log("updated the customer in generator", customer);
    yield put(customerUpdateSuccess(customer))
  } catch (error) {
    yield put(customerUpdateError(Error("There was a problem verifying your payment method.")))
  }
}

// This will be run when the MEAL_REQUEST Action is found by the watcher
function * customerCreateFlow(action) {
  console.log("In customer create saga");
  const { stripe, extraDetails } = action.payload
  try {
    // console.log("stripe token in generator: ", stripeToken);
    const stripeToken = yield call(
      getStripeToken,
      stripe,
      extraDetails,
      'card'
    )
    // Make the request body
    const body = getBodyFromStripeToken(stripeToken)
    // Got token, now we need to create the customer profile
    const token = yield select(getToken)
    const customer = yield call(
      apiPost,
      getCustomersUrl(),
      body,
      token
    )
    console.log("created the customer in generator", customer);
    yield put(customerCreateSuccess(customer))
  } catch (error) {
    yield put(customerCreateError(Error("There was a problem verifying your payment method.")))
  }
}

function* customerWatcher () {
  // Does this array thing cancel other tasks when it finds one of them?
  // AKA are there any concurrency issues with this?
  yield [
    takeLatest(CUSTOMER_REQUEST, customerRequestFlow),
    takeLatest(CUSTOMER_CREATE_REQUEST, customerCreateFlow),
    takeLatest(CUSTOMER_UPDATE_REQUEST, customerUpdateFlow),
  ]
}

export default customerWatcher
