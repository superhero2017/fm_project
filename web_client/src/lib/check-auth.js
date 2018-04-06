/* eslint-disable no-unused-vars */
import {
  setToken, clientProfileRequest,
  customerRequest,
} from '../actions/'
import { decode } from '../lib/jwt'
import { postAuthActions } from '../lib/post-auth'

export function checkCredentials (dispatch) {
  // attempt to grab the token from localstorage
  const storedToken = localStorage.getItem('token')

  // if it exists
  if (storedToken) {
    // parse it down into an object
    const token = JSON.parse(storedToken)
    // console.log("found the stored token")
    // console.log(token)

    // Get expiration date encoded in the token
    const decodedToken = decode(token.token)
    const expiry = decodedToken.exp * 1000

    // if the token has expired (or will expire soon) return false
    if (Date.now() > expiry - 100) {
      console.log("token expired")
      return false
    } else {
      console.log("token not expired")
    }

    // otherwise, dispatch the token to our setClient action
    // which will update our redux state with the token and return true
    dispatch(setToken(token))
    // console.log(token.user.pk)
    // Get the user's profile and any additional info we want

    // Call all the post auth actions
    postAuthActions.forEach((a) => dispatch(a()))
    return true
  }
  console.log("no stored client")
  return false
}
