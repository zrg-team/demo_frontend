import React, { Component } from 'react'
import '../../styles/transition.css'

let instanceProgressLoading = null
class ProgressLoading extends Component {
  static defaultProps = {
    cls: '',
    style: {},
    thumbStyle: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      state: 'hidden',
      options: {}
    }
    this.count = 0
    this.runningTimerId = null
    this.hidingTimerId = null
  }

  initElement = (el) => {
    this.element = el
  }

  render () {
    const { options } = this.state
    let { cls, thumbStyle } = this.props
    let className = `loader-60devs ${cls}`
    return (
      <div id='loader-progress-instance' className={`${className}`} style={options.style || {}} data-state={this.state.state} ref={this.initElement}>
        <div className='loader-60devs-progress' style={thumbStyle} />
      </div>
    )
  }

  componentWillMount () {
    instanceProgressLoading = this
  }

  componentWillUnmount () {
    clearTimeout(this.hidingTimerId)
    // delete instanceProgressLoading
    instanceProgressLoading = null
  }
}

let hidingTimerId = null
let count = 0

export default {
  Component: ProgressLoading,
  show (options = {}) {
    const element = document.getElementById('loader-progress-instance')
    if (count > 1 || !element) {
      return false
    }
    clearTimeout(hidingTimerId)
    let progressEl = element.querySelector('.loader-60devs-progress')
    element.setAttribute('data-state', 'hidden')
    // the only working way to restart a transition on firefox
    progressEl.outerHTML = progressEl.outerHTML
    let offset = element.offsetHeight
    element.setAttribute('data-state', '')
    offset = element.offsetHeight
    element.setAttribute('data-state', 'running')
  },
  hide () {
    if (--count > 0) {
      return
    }
    const element = document.getElementById('loader-progress-instance')
    element.setAttribute('data-state', 'finishing')
    hidingTimerId = setTimeout(() => {
      element.setAttribute('data-state', 'hidden')
    }, 500)

  },
  hideAll () {
    const element = document.getElementById('loader-progress-instance')
    element.setAttribute('data-state', 'finishing')
    hidingTimerId = setTimeout(() => {
      element.setAttribute('data-state', 'hidden')
    }, 500)
  }
}
