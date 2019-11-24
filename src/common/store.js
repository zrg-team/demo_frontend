import { createStore, combineReducers } from 'redux'
import commonReducers from './reducers'
import mapModuleReducers from '../modules'

const createReducers = initialState => {
  return combineReducers({
    common: commonReducers,
    ...mapModuleReducers(initialState)
  })
}

export const initializeStore = (initialState) => {
  const store = createStore(createReducers(initialState), initialState)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(initialState))
    })
  }

  store.reducers = createReducers(initialState)
  return { store }
}
