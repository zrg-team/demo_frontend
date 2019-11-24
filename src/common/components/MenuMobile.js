import React, { Component } from 'react'
import SelectBox from './widgets/SelectBox'
import storeAccessible from '../utils/storeAccessible'
import { setLanguage } from '../actions'
import { setCookie } from '../utils/cookies'

export class MenuMobile extends Component {
  handleChangeLanguage (value) {
    storeAccessible.dispatch(setLanguage(value === 2 ? 'vi' : 'en'))
    setCookie('language', value === 2 ? 'vi' : 'en')
    setTimeout(() => {
      window.location.reload()
    }, 400)
  }

  render () {
    const { style, className, language } = this.props
    return (
      <nav style={style} className={`mmenu-init mm-menu mm-offcanvas mm-opened ${className}`} id='mm-0'>
        <div className='mm-panels'>
          <div className='mm-panel mm-hasnavbar mm-opened' id='mm-1'>
            <div className='mm-navbar'>
              <a className='mm-title'>Menu</a>
            </div>
            <ul className='mm-listview'>
              {this.props.renderNavigations()}
              <div className='d-none d-sm-max-block'>
                <SelectBox
                  styles={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                  items={[{
                    title: 'English',
                    id: 1
                  }, {
                    title: 'Tiếng Việt',
                    id: 2
                  }]}
                  defaultValue={language === 'vi' ? 2 : 1}
                  onChange={this.handleChangeLanguage}
                />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default MenuMobile
