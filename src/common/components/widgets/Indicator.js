import React from 'react'

function Indicator (props) {
  if (!props.title) return ''

  return (
    <div className='indicator' style={props.styles}>
      <strong>{props.persent || 0}%</strong>
      <div className='indicator-bar'>
        <span style={{ width: `${props.persent}%` }} />
      </div>
      <span>{props.title}</span>
    </div>
  )
}

export default Indicator
