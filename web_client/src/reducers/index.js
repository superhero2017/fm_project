/* eslint-disable no-unused-vars */
import { combineReducers, } from 'redux'
import { combineForms } from 'react-redux-form';
import { routerReducer as router } from 'react-router-redux'


// Import Forms
import { editMealForm } from './forms/editMeal'
import { editProfileForm, } from './forms/editProfile'
import { loginForm } from './forms/login'
import { newMealForm } from './forms/newMeal'
import { rsvpForm } from './forms/rsvp'
import { signupForm } from './forms/signup'
import { chefApplicationForm } from './forms/chefApplication'

// Import Form Status
import { editMealStatus } from './status/editMeal'
import { editProfileStatus } from './status/editProfile'
import { loginStatus } from './status/login'
import { newMealStatus } from './status/newMeal'
import { rsvpStatus } from './status/rsvp'
import { signupStatus } from './status/signup'
import { chefApplicationStatus } from './status/chefApplication'

// Import the rest
import { clientReducer as client } from './client'
import { mealsReducer as meals } from './meals'
import { profilesReducer as profiles } from './profiles'
import { tokenReducer as token} from './token'
import { stripeReducer as stripe } from './stripe'

const reducer = combineReducers({
  client,
  meals,
  profiles,
  token,
  router,
  stripe,

  forms: combineForms({
    editMeal: editMealForm,
    editProfile: editProfileForm,
    newMeal: newMealForm,
    login: loginForm,
    rsvp: rsvpForm,
    signup: signupForm,
    chefApplication: chefApplicationForm,
  }, 'forms'),

  status: combineReducers({
    editMeal: editMealStatus,
    editProfile: editProfileStatus,
    login: loginStatus,
    newMeal: newMealStatus,
    rsvp: rsvpStatus,
    signup: signupStatus,
    chefApplication: chefApplicationStatus,
  }),
})


export default reducer;

// Export selectors
export const getRedirectPathname = (state) => state.router.location.redirect;
export const getActivePathname = (state) => state.router.location.pathname;
