import * as fromToken from './reducers/token'
import * as fromReducers from './reducers/'
import * as fromMeals from './reducers/meals'
import * as fromProfiles from './reducers/profiles'
import * as fromClient from './reducers/client'

// REDUCERS
export const getRedirectPathname = (state) => fromReducers.getRedirectPathname(state)
export const getActivePathname = (state) => fromReducers.getActivePathname(state)

// TOKEN
export const getToken = (state) => {
  return fromToken.getToken(state.token);
}
export const getCurrentUser = (state) => {
  return fromToken.getCurrentUser(state.token)
}
export const getCurrentUserId = (state) => {
  return fromToken.getCurrentUserId(state.token)
}
export const isLoggedIn = (state) => {
  return fromToken.isLoggedIn(state.token)
}
export const getUserFirstName = (state) => {
  return fromToken.getUserFirstName(state.token)
} 


// MEALS
export const getMealById = (state, id) =>  {
  return fromMeals.getMealById(state.meals, id)
}
export const getMealsWithUserId = (state, id) => {
  return fromMeals.getMealsByUserId(state.meals, id)
}
export const getCreatedMeals = (state) => {
  return fromMeals.getMealsWithUserId(
    state.meals, getCurrentUserId(state)
  )
}

// PROFILE
export const getProfileById = (state, id) => {
  return fromProfiles.getProfileById(state.profiles, id)
}
export const getProfPicById = (state, id) => {
  return fromProfiles.getProfPicById(state.profiles, id)
}

// CLIENT
export const getClientProfile = (state) => {
  return fromClient.getClientProfile(state.client)
}
export const getClientCustomer = (state) => {
  return fromClient.getClientCustomer(state.client)
}
