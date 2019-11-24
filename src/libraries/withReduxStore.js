import React from 'react'
import { initializeStore } from '../common/store'
import changeLanguage from '../common/utils/locate'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export let reduxInstance = null

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const cookie = appContext.ctx.req ? appContext.ctx.req.cookies : {}
      let initialState = {}
      try {
        const user = JSON.parse(cookie.user)
        const detail = JSON.parse(decodeURIComponent(cookie.reference))
        const referenceType = cookie.reference_type
        initialState = {
          user: {
            user: {
              ...user,
              [referenceType]: detail
            },
            token: cookie.token
          }
        }
      } catch (err) {
        console.log('err', err)
      }
      const language = cookie.language || 'en'

      reduxInstance = getOrCreateStore({
        ...initialState,
        common: {
          language
        }
      })
      // Provide the store to getInitialProps of pages
      appContext.ctx.store = reduxInstance.store

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }
      return {
        ...appProps,
        language,
        initialReduxState: reduxInstance.store.getState()
      }
    }

    constructor (props) {
      super(props)
      reduxInstance = getOrCreateStore(props.initialReduxState)
      changeLanguage(props.language)
    }

    render () {
      return <App {...this.props} store={reduxInstance.store} />
    }
  }
}
