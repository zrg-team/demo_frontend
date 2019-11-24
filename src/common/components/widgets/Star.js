import React from 'react'
import i18n from 'i18n-js'
export default (props) => {
  if (!props.star) {
    return (
      <b style={{ color: '#febe42' }}>{i18n.t('common.no_rating')}</b>
    )
  }

  const renderStar = (star) => {
    const stars = []
    for (let i = 0; i < star; i++) {
      stars.push(<span key={i} className='star' />)
    }
    return stars.map(star => star)
  }

  return (
    <span className='star-rating' data-rating={props.star || 0}>
      {renderStar(props.star)}
    </span>
  )
}
