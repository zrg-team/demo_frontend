import React, { Component } from 'react'
import i18n from 'i18n-js'
class BookmarkButton extends Component {
  static getDerivedStateFromProps (props, state) {
    return typeof state.isBookmarked === 'undefined'
      ? { isBookmarked: !!props.defaultValue }
      : { isBookmarked: state.isBookmarked }
  }

  constructor (props) {
    super(props)
    this.state = {
      isBookmarked: undefined
    }
    this.toggleBookmark = this.toggleBookmark.bind(this)
  }

  toggleBookmark () {
    this.setState({ isBookmarked: !this.state.isBookmarked }, () => {
      const { onChange } = this.props
      if (onChange) {
        onChange(this.state.isBookmarked)
      }
    })
  }

  render () {
    const { isBookmarked } = this.state

    return (
      <button
        onClick={this.toggleBookmark}
        className={`bookmark-button margin-bottom-25 ${
          isBookmarked ? 'bookmarked' : ''
        }`}
      >
        <span className='bookmark-icon' />
        <span className='bookmark-text'>{i18n.t('common.bookmark')}</span>
        <span className='bookmarked-text'>{i18n.t('common.bookmarked')}</span>
      </button>
    )
  }
}

export default BookmarkButton
