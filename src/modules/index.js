// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'

// MODULE REDUCERS
import userReducers from './user/reducers'

export default (state) => {
  return {
    [MODULE_USER]: userReducers
  }
}
