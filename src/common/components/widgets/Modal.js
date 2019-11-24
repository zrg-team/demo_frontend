import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
class ModalComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  show (component, { title, closeModal, afterOpenModal }) {
    this.setState({
      isShow: true,
      component,
      title,
      closeModal,
      afterOpenModal
    })
  }

  hide () {
    this.setState({
      isShow: false,
      component: null,
      title: null,
      closeModal: null,
      afterOpenModal: null
    })
  }

  isVisible () {
    const { isShow } = this.state
    return isShow
  }

  componentDidMount () {
    ModalComponent.instance = this
  }

  componentWillUnmount () {
    delete ModalComponent.instance
  }

  render () {
    const { isShow, component, title, closeModal, afterOpenModal } = this.state

    if (!isShow || !component) {
      return null
    }
    return (
      <Modal
        isOpen={isShow}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={title || ''}
      >
        {component}
      </Modal>
    )
  }
}

export default {
  Component: ModalComponent,
  show (component, params = {}) {
    ModalComponent.instance && ModalComponent.instance.show(component, params)
  },
  hide () {
    ModalComponent.instance && ModalComponent.instance.hide()
  },
  isVisible () {
    return ModalComponent.instance.isVisible()
  }
}
