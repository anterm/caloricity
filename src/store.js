import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { auth, products, portions } from './reducers'

const reducer = combineReducers({
	auth,
  products,
  portions
})

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  callAPIMiddleware
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload
    } = action
    
    
    if (!types) {
      // Normal action: pass it on
      console.log("action", action)
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    dispatch({ type: requestType, payload })

    return callAPI().then(
      response => dispatch({ type: successType, payload, response }),
      error 	 => dispatch({ type: failureType, payload, error })
    )
  }
}