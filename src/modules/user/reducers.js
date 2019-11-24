import { handleActions } from 'redux-actions'

const defaultState = {
  user: null,
  token: null
}

const handlers = {
}

export default handleActions(handlers, defaultState)
