/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, } from 'redux'
import { Provider } from 'react-redux'
import { Route, } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerMiddleware as createRouterMiddleware,
} from 'react-router-redux'
// import 'bootstrap/dist/css/bootstrap.css';

import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers/'
import IndexSagas from './index-sagas'
import App from './containers/App'

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()
const routerMiddleware = createRouterMiddleware(history)

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware,
      loggerMiddleware, // neat middleware that logs actions
    )
  ),
)
/* eslint-enable */

sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
