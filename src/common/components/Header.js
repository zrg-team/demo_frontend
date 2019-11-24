import { connect } from 'react-redux'
import React, { Component } from 'react'
import { MODULE_NAME as MODULE_USER } from '../../modules/user/models'
import userHandlers from '../../modules/user/handlers'
class Header extends Component {
  render () {
    return (
      <header id='header-container' className='fullwidth' />
    )
  }
}

const mapStateToProps = (state, props) => {
  // TODO: Only map something usefull
  return {
    token: state[MODULE_USER].token,
    user: state[MODULE_USER].user
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => ({ ...userHandlers({ dispatch }) })
)(Header)
