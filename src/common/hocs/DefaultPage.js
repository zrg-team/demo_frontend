import React from 'react'
import PageLoading from '../components/widgets/PageLoading'
import Modal from '../components/widgets/Modal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default class DefaultPage extends React.Component {
  render () {
    const { children } = this.props
    return (
      <>
        {children}
        <PageLoading.Component />
        <Modal.Component />
        <ToastContainer />
      </>
    )
  }
}
