import { handleActions } from 'redux-actions'
import * as actions from '../actions'
import changeLanguage from '../utils/locate'

const defaultState = {
  language: 'en',
  timeout: 30000,
  user: null
}

const handlers = {
  [actions.clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setUser]: (state, action) => ({
    ...state,
    user: action.payload.user,
    token: action.payload.token
  }),
  [actions.setLanguage]: (state, action) => {
    changeLanguage(action.payload)
    return {
      ...state,
      language: action.payload
    }
  }
}

export default handleActions(handlers, defaultState)
