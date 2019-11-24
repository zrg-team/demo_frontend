import React, { Component } from 'react'

class SocialProfiles extends Component {
  render () {
    const { socials } = this.props

    return (
      <div className='sidebar-widget'>
        <h3>Social Profiles</h3>
        <div className='freelancer-socials margin-top-25'>
          <ul>
            {socials && Array.isArray(socials) && socials.map(
              (social, index) => (
                <li key={index}>
                  <a
                    href={social.url || '#'}
                    title={social.title || ''}
                    data-tippy-placement='top'
                  >
                    <i className={social.icon || ''} />
                  </a>
                </li>

              )
            )}
          </ul>
        </div>
      </div>

    )
  }
}

export default SocialProfiles
