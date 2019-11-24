import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../src/libraries/withReduxStore'
import { Provider } from 'react-redux'
import Modal from '../src/common/components/widgets/Modal'

class MyApp extends App {
  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
          <Modal.Component />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
