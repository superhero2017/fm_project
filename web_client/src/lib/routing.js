import {
  put, select,
} from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { getRedirectPathname } from '../selectors'

export function * redirectGenerator(path) {
  const pathname = path ? path : yield select(getRedirectPathname)
  // Redirect to original destination and clear redirect destination from router state
  yield put(push({
    pathname: pathname ? pathname : '/',
    redirect: undefined,
  }))
}
