/* eslint-disable no-unused-vars */

/////////////////////////////////////////////////////
import { TOKEN_SET, TOKEN_UNSET, LOGOUT_REQUEST, } from '../constants'
import { decode } from '../lib/jwt'

export function setToken({ token, user, }) {
  localStorage.setItem('token', JSON.stringify({ token, user, }))
  return {
    type: TOKEN_SET,
    payload: {
      token,
      user,
    },
  }
}

export function unsetToken() {
  localStorage.removeItem('token')
  return {
    type: TOKEN_UNSET,
  }
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}

///////////////////// signup //////////////////
import {
  SIGNUP_REQUESTING,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_ERROR,
  RESET_SIGNUP_FORM,
} from '../constants'

export function signupRequest ({
  email,
  first_name,
  last_name,
  password1,
  password2,
}) {
  return {
    type: SIGNUP_REQUESTING,
    payload: {
      email,
      first_name,
      last_name,
      password1,
      password2,
    },
  }
}

export function signupRequestSuccess() {
  return {
    type: SIGNUP_REQUEST_SUCCESS,
  }
}

export function signupRequestError(error) {
  console.log("SIGNUPREQUEST ERROR")
  console.log(error)
  return {
    type: SIGNUP_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

export function resetSignupForm() {
  return {
    type: RESET_SIGNUP_FORM,
  }
}

///////////////////// login //////////////////
import {
  LOGIN_REQUESTING,
  FACEBOOK_LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
} from '../constants'
export function loginRequest ({ email, password, }) {
  // console.log("loginrequest")
  // console.log(email)
  // console.log(password)
  return {
    type: LOGIN_REQUESTING,
    payload: {
      email,
      password,
    },
  }
}

export function facebookLoginRequest (response) {
  return {
    type: FACEBOOK_LOGIN_REQUEST,
    payload: {
      access_token: response.accessToken,
    },
  }
}

export function loginRequestSuccess() {
  return {
    type: LOGIN_REQUEST_SUCCESS,
  }
}

export function loginRequestError(error) {
  return {
    type: LOGIN_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}


//////////////////// meals list /////////////////////////////
import {
  MEALS_REQUESTING,
  MEALS_REQUEST_SUCCESS,
  MEALS_REQUEST_ERROR,
  MEAL_REQUEST,
  MEAL_REQUEST_SUCCESS,
  MEAL_REQUEST_ERROR,
} from '../constants'


export function mealRequest(id) {
  return {
    type: MEAL_REQUEST,
    payload: {
      id,
    }
  }
}

export function mealRequestSuccess(meal) {
  return {
    type: MEAL_REQUEST_SUCCESS,
    payload: {
      meal,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function mealRequestError(error) {
  // console.log(error)
  return {
    type: MEAL_REQUEST_ERROR,
    payload: {
      error,
    },
    error: true,
  }
}

export function mealsRequest() {
  console.log("requesting meals");

  return {
    type: MEALS_REQUESTING,
  }
}

export function mealsRequestSuccess(response) {
  return {
    type: MEALS_REQUEST_SUCCESS,
    payload: {
      response,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function mealsRequestError(error) {
  return {
    type: MEALS_REQUEST_ERROR,
    payload: {
      error,
    },
    error: true,
  }
}


/////////////////// create new meal ////////////////////////////////////
import {
  NEW_MEAL_REQUESTING,
  NEW_MEAL_REQUEST_SUCCESS,
  NEW_MEAL_REQUEST_ERROR,
  RESET_NEW_MEAL_FORM,
} from '../constants'

// Create requires that we pass it our current logged in client AND meal params
// which you can view at http://mealizer.jcolemorrison.com/explorer OR at
// localhost:3002/explorer if you're using the local API version.
export function newMealRequest (meal) {
  console.log("ACTION NEW MEAL REQUEST")
  console.log(meal)
  return {
    type: NEW_MEAL_REQUESTING,
    payload: {
      ...meal,
    },
  }
}

export function newMealRequestSuccess (meal) {
  return {
    type: NEW_MEAL_REQUEST_SUCCESS,
    payload: {
      meal,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function newMealRequestError (error) {
  return {
    type: NEW_MEAL_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

export function resetNewMealForm() {
  return {
    type: RESET_NEW_MEAL_FORM,
  }
}

//////////////////////////// Delete meal /////////////////////////////////
import {
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_REQUEST_SUCCESS,
  DELETE_MEAL_REQUEST_ERROR,
} from '../constants'

export function deleteMealRequest(meal) {
  console.log("deleting meal")
  console.log(meal);
  return {
    type: DELETE_MEAL_REQUEST,
    payload: {
      id: meal.id,
    }
  }
}

export function deleteMealRequestSuccess(id) {
  return {
    type: DELETE_MEAL_REQUEST_SUCCESS,
    payload: {
      id,
    }
  }
}

export function deleteMealRequestError (error) {
  return {
    type: DELETE_MEAL_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

//////////////////////////// Edit meal /////////////////////////////////
import {
  EDIT_MEAL_REQUEST,
  EDIT_MEAL_REQUEST_SUCCESS,
  EDIT_MEAL_REQUEST_ERROR,
} from '../constants'

export function editMealRequest(id, form) {
  console.log("editing meal")
  // Pull status out of the values object (if it's there)
  const { status, ...fields, } = form
  return {
    type: EDIT_MEAL_REQUEST,
    payload: {
      id,
      fields: {
        ...fields,
      }
    }
  }
}

export function editMealRequestSuccess(meal) {
  return {
    type: EDIT_MEAL_REQUEST_SUCCESS,
    payload: {
      meal,
    }
  }
}

export function editMealRequestError(error) {
  return {
    type: EDIT_MEAL_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

///////////////////////////////////// RSVP ////////////////////////////////////
import {
  RSVP_REQUESTING,
  RSVP_REQUEST_SUCCESS,
  RSVP_REQUEST_ERROR,
  RSVP_NEXT_BUTTON_CLICKED,
  RSVP_BACK_BUTTON_CLICKED,
  RSVP_CARD_VALIDITY_CHANGED,
} from '../constants'

// Create requires that we pass it our current logged in client AND meal params
// which you can view at http://mealizer.jcolemorrison.com/explorer OR at
// localhost:3002/explorer if you're using the local API version.
export function rsvpRequest(rsvp, meal) {
  console.log("RSVPREQUEST")
  // console.log(rsvp)
  // console.log(meal)
  const { comments, servings, delivery_method, } = rsvp
  return {
    type: RSVP_REQUESTING,
    payload: {
      comments,
      servings,
      delivery_method,
      meal: meal.url,
    },
  }
}

export function rsvpRequestSuccess(rsvp) {
  return {
    type: RSVP_REQUEST_SUCCESS,
    payload: {
      rsvp,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function rsvpRequestError (error) {
  return {
    type: RSVP_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

export function rsvpNextButtonClicked() {
  return {
    type: RSVP_NEXT_BUTTON_CLICKED,
  }
}

export function rsvpBackButtonClicked() {
  return {
    type: RSVP_BACK_BUTTON_CLICKED,
  }
}

export function rsvpCardValidityChanged(valid) {
  // console.log("CARD CHANGEd");
  // console.log(valid);
  return {
    type: RSVP_CARD_VALIDITY_CHANGED,
    payload: {
      valid,
    }
  }
}



/////////////////////////////// Profile View ///////////////////////////
import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_ERROR,
} from '../constants'

export function profileRequest(id) {
  return {
    type: PROFILE_REQUEST,
    payload: {
      id,
    }
  }
}

export function profileRequestSuccess(profile) {
  return {
    type: PROFILE_REQUEST_SUCCESS,
    payload: {
      profile,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function profileRequestError(error) {
  // console.log(error)
  return {
    type: PROFILE_REQUEST_ERROR,
    payload: {
      error,
    },
    error: true,
  }
}


//////////////////// Deal with client (current user) data /////////////
import {
  CLIENT_PROFILE_REQUEST,
  CLIENT_PROFILE_REQUEST_SUCCESS,
  CLIENT_PROFILE_REQUEST_ERROR,
} from '../constants'

export function clientProfileRequest() {
  return {
    type: CLIENT_PROFILE_REQUEST,
  }
}

export function clientProfileRequestSuccess(profile) {
  return {
    type: CLIENT_PROFILE_REQUEST_SUCCESS,
    payload: {
      profile,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function clientProfileRequestError(error) {
  // console.log(error)
  return {
    type: CLIENT_PROFILE_REQUEST_ERROR,
    payload: {
      error,
    },
    error: true,
  }
}

import {
  INIT_EDIT_PROFILE_FORM,
  RESET_EDIT_PROFILE_FORM,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_REQUEST_SUCCESS,
  EDIT_PROFILE_REQUEST_ERROR,
} from '../constants'

export function initEditProfileForm() {
  // console.log("SETTING INITIAL FORM STATUS");
  return {
    type: INIT_EDIT_PROFILE_FORM,
  }
}

export function resetEditProfileForm() {
  return {
    type: RESET_EDIT_PROFILE_FORM,
  }
}

export function editProfileRequest(id, form) {
  // Pull status out of the values object (if it's there)
  const { status, ...fields, } = form
  return {
    type: EDIT_PROFILE_REQUEST,
    payload: {
      id,
      fields: {
        ...fields,
      }
    }
  }
}

export function editProfileRequestSuccess(profile) {
  return {
    type: EDIT_PROFILE_REQUEST_SUCCESS,
    payload: {
      profile,
    }
  }
}

export function editProfileRequestError(error) {
  return {
    type: EDIT_PROFILE_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

///////////////////////////////// Get Customer Stripe Token /////////////
import {
  STRIPE_CUSTOMER_TOKEN_REQUEST,
  STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS,
  STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR,
} from '../constants'

export function stripeCustomerTokenRequest(stripe, extraDetails) {
  console.log("stripe token request")
  // console.log(rsvp)
  // console.log(meal)
  return {
    type: STRIPE_CUSTOMER_TOKEN_REQUEST,
    payload: {
      stripe,
      extraDetails,
    },
  }
}

export function stripeCustomerTokenRequestSuccess(
  stripeToken
) {
  return {
    type: STRIPE_CUSTOMER_TOKEN_REQUEST_SUCCESS,
    payload: {
      stripeToken,
    },
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function stripeCustomerTokenRequestError(error) {
  return {
    type: STRIPE_CUSTOMER_TOKEN_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

//////////////////////// Customer model ////////////////////////////
import {
  CUSTOMER_REQUEST,
  CUSTOMER_REQUEST_SUCCESS,
  CUSTOMER_REQUEST_ERROR,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_ERROR,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_ERROR,

} from '../constants'

// export function customerCreate(stripeToken) {
//   const { id, card, } = stripeToken
//   return {
//     type: CUSTOMER_CREATE_REQUEST,
//     payload: {
//       body: {
//         customer_token: id,
//         billing_card_number: card.last4,
//         billing_zip: card.address_zip,
//         billing_type: card.brand,
//         billing_expiry_month: card.exp_month,
//         billing_expiry_year: card.exp_year,
//         billing_country: card.country,
//       }
//     }
//   }
// }

export function customerRequest() {
  console.log('REQUESTING CUSTOMER ACTION');
  return {
    type: CUSTOMER_REQUEST,
  }
}

export function customerRequestSuccess(customer) {
  console.log("Customer request was successful");
  console.log(customer);
  return {
    type: CUSTOMER_REQUEST_SUCCESS,
    payload: {
      customer
    }
  }
}

export function customerRequestError(error) {
  console.log("There was an error getting customer");
  console.log(error);
  return {
    type: CUSTOMER_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

export function customerCreateRequest(stripe, extraDetails) {
  return {
    type: CUSTOMER_CREATE_REQUEST,
    payload: {
      stripe,
      extraDetails,
    }
  }
}

export function customerCreateSuccess(customer) {
  console.log("Customer creation was successful");
  console.log(customer);
  return {
    type: CUSTOMER_CREATE_SUCCESS,
    payload: {
      customer
    }
  }
}

export function customerCreateError(error) {
  console.log("There was an error creating customer");
  console.log(error);
  return {
    type: CUSTOMER_CREATE_ERROR,
    payload: error,
    error: true,
  }
}

export function customerUpdateRequest(
  stripe, extraDetails, id
) {
  // const { id, card, } = stripeToken
  return {
    type: CUSTOMER_UPDATE_REQUEST,
    payload: {
      stripe,
      extraDetails,
      id,
    }
  }
}

export function customerUpdateSuccess(customer) {
  console.log("Customer creation was successful");
  console.log(customer);
  return {
    type: CUSTOMER_UPDATE_SUCCESS,
    payload: {
      customer
    }
  }
}

export function customerUpdateError(error) {
  console.log("There was an error creating customer");
  console.log(error);
  return {
    type: CUSTOMER_UPDATE_ERROR,
    payload: error,
    error: true,
  }
}


////////////// Chef Application ////////////////////////
import {
  CHEF_APPLY_REQUEST,
  CHEF_APPLY_REQUEST_SUCCESS,
  CHEF_APPLY_REQUEST_ERROR,
  RESET_CHEF_APPLICATION_FORM,
} from '../constants'

// Create requires that we pass it our current logged in client AND meal params
// which you can view at http://mealizer.jcolemorrison.com/explorer OR at
// localhost:3002/explorer if you're using the local API version.
export function chefApplyRequest (application) {
  return {
    type: CHEF_APPLY_REQUEST,
    payload: {
      ...application,
    },
  }
}

export function chefApplyRequestSuccess () {
  return {
    type: CHEF_APPLY_REQUEST_SUCCESS,
    meta: {
      receivedAt: Date.now()
    },
  }
}

export function chefApplyRequestError (error) {
  return {
    type: CHEF_APPLY_REQUEST_ERROR,
    payload: error,
    error: true,
  }
}

export function resetchefApplicationForm() {
  return {
    type: RESET_CHEF_APPLICATION_FORM,
  }
}
// //////////////////////// Facebook //////////////////
// import {
//   FACEBOOK_CONNECTED,
// } from '../constants'
//
// export function facebookConnected(response) {
//   return {
//     type: FACEBOOK_CONNECTED,
//     payload: response,
//   }
// }
