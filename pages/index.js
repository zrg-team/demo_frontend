import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import DefaultPage from '../src/common/hocs/DefaultPage'
import Header from '../src/common/containers/Header'
import Footer from '../src/common/containers/Footer'
// import handlers from '../src/modules/user/handlers'
import '../src/common/styles/how-it-work.css'

class Home extends React.Component {
  static async getInitialProps ({ store, req, ...rest }) {
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`

    // Redux function
    // const functions = handlers({
    //   store,
    //   dispatch: store.dispatch,
    //   req,
    //   ...rest
    // })
    const user = store.getState().user
    const isLogin = !!user.token
    const results = {}
    try {
    } catch (err) {
      console.log('err', err)
    }
    return { ...results, isLogin, user }
  }

  render () {
    return (
      <DefaultPage>
        <Head>
          <title>Portal</title>
        </Head>
        <div id='wrapper'>
          <Header />
          <div className='clearfix' />
          <Footer />
        </div>
      </DefaultPage>
    )
  }
}

export default connect(
  null,
  null
)(Home)
