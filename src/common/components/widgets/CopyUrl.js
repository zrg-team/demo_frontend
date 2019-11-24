import React, { Component } from 'react'

class CopyUrl extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url || '#'
    }
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  componentDidMount () {
    if (window) {
      this.setState({ currentUrl: window.location })
    }
  }

  copyToClipboard () {
    this.refs.copyUrl.select()
    document.execCommand('copy')
  };

  render () {
    const { currentUrl } = this.state
    return (
      <div className='copy-url'>
        <input
          type='text'
          value={currentUrl || '#'}
          className='with-border'
          ref='copyUrl'
          onChange={() => {}}
        />
        <button
          className='copy-url-button ripple-effect'
          title='Copy to Clipboard'
          onClick={this.copyToClipboard}
        >
          <i className='icon-material-outline-file-copy' />
        </button>
      </div>
    )
  }
}

export default CopyUrl
