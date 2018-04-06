import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'  
// import { combineForms } from 'react-redux-form'
import rootReducer from '../reducers/'
import { composeWithDevTools } from 'redux-devtools-extension';

// const initialMealFormState = {
//   name: '',
//   description: '',
// }
//

const sagaMiddleWare = createSagaMiddleWare()
const loggerMiddleware = createLogger()
export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        // thunkMiddleware, // lets us dispatch() functions
        sagaMiddleWare,
        loggerMiddleware // neat middleware that logs actions
      )
    ),
  )
  /* eslint-enable */
}
