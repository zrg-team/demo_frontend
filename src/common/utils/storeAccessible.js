import { reduxInstance } from '../../libraries/withReduxStore'

function defaultDispatch () {
  console.problem('Missing store')
}

class StoreAccessible {
  /**
   * @protected
   */
  getStates () {
    return (reduxInstance.store && reduxInstance.store.getState()) || {}
  }

  /**
   * @protected
   */
  getState (moduleName) {
    if (!moduleName) {
      return {}
    }
    const store = (reduxInstance.store && reduxInstance.store.getState()) || {}
    return store[moduleName] || {}
  }

  /**
   * @protected
   */
  get dispatch () {
    return (reduxInstance.store && reduxInstance.store.dispatch) || defaultDispatch
  }
}

export default new StoreAccessible()
