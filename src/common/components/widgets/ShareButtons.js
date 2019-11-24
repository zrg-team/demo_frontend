import React, { Component } from 'react'
import i18n from 'i18n-js'
class ShareButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUrl: props.url || '#'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    if (window) {
      this.setState({ currentUrl: window.location })
    }
  }

  handleClick (url) {
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=1200')
  }

  render () {
    const { currentUrl } = this.state

    this.buttons = [
      {
        bgColor: '#3b5998',
        url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        icon: 'icon-brand-facebook-f',
        title: 'Share on Facebook'
      },
      {
        bgColor: '#1da1f2',
        url: `https://twitter.com/share?url=${currentUrl}`,
        icon: 'icon-brand-twitter',
        title: 'Share on Twitter'
      },
      {
        bgColor: '#0077b5',
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`,
        icon: 'icon-brand-linkedin-in',
        title: 'Share on LinkedIn'
      }
    ]

    return (
      <div className='share-buttons margin-top-25'>
        <div className='share-buttons-trigger'>
          <i className='icon-feather-share-2' />
        </div>
        <div className='share-buttons-content'>
          <span>
            {i18n.t('widgets.interesting')}? <strong>{i18n.t('widgets.share_it')}!</strong>
          </span>
          <ul className='share-buttons-icons'>

            {this.buttons.map((button, index) => (
              <li key={index}>
                <a
                  href={button.url || '#'}
                  target='_blank'
                  style={{ backgroundColor: button.bgColor || '' }}
                  title={button.title || ''}
                  data-tippy-placement='top'
                  onClick={() => this.handleClick(button.url || '#')}
                >
                  <i className={button.icon || ''} />
                </a>
              </li>

            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShareButtons
