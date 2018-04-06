import { TOKEN_SET, TOKEN_UNSET } from '../constants'

const initialState = {
  token: "",
  user: null,
}

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_SET:
      const ret = {
        ...action.payload
      }
      // console.log(ret)
      return ret

    case TOKEN_UNSET:
      // console.log("TOKEN UNSET REDUCER")
      return {
        ...initialState,
      }

    default:
      return state
  }
}

export { tokenReducer }

// This is a selector that returns the token, to be used by the saga to call the api
export const getToken = (state) => {
  // console.log("GETTOKEN")
  console.log(state)
  return state ? state.token : undefined
}

export const getCurrentUser = (state) => {
  return state ? state.user : undefined
}

export const getCurrentUserId = (state) => {
  const user = getCurrentUser(state)
  return user ? user.pk : user
}

export const getUserFirstName = (state) => {
  return getCurrentUser(state).first_name
}

export const isLoggedIn = (state) => {
  // console.log(getUser(state))
  // console.log(getUser(state) != undefined)
  return getCurrentUser(state) !== null
}
