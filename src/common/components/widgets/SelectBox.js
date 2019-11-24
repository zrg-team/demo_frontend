import React, { Component } from 'react'
import './styles/SelectBox.css'
export default class SelectBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      items: this.props.items || [],
      selectedKeys: !props.defaultValue
        ? []
        : Array.isArray(props.defaultValue)
          ? props.defaultValue
          : [props.defaultValue]
    }

    this.handleClick = this.handleClick.bind(this)
    this.onClickItem = this.onClickItem.bind(this)
    this.toggleItems = this.toggleItems.bind(this)
    this.renderSelectedValue = this.renderSelectedValue.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  isSelected (id, arr = []) {
    return arr.find(item => item === id)
  }

  handleClick () {
    this.toggleItems()
  }

  toggleItems () {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  onClickItem (item) {
    const { multiple, onChange } = this.props
    if (!multiple) {
      this.toggleItems()
      this.setState(
        {
          selectedKeys: [item.id]
        },
        () => {
          const values = multiple
            ? this.state.selectedKeys
            : this.state.selectedKeys[0]
          if (onChange) {
            onChange(values)
          }
        }
      )
    }
  }

  renderSelectedValue () {
    const { items, selectedKeys } = this.state
    const { multiple } = this.props
    if (!multiple) {
      if (!selectedKeys.length) {
        return <div>Please select</div>
      } else {
        const item = items.find(item => item.id === selectedKeys[0])
        return <div key={item.id}>{item.title}</div>
      }
    } else {
      if (!selectedKeys.length) {
        return <div>Please select</div>
      } else {
        return <div>{`${selectedKeys.length} item`}</div>
      }
    }
  }

  render () {
    const { show, items, selectedKeys } = this.state
    const { styles = {} } = this.props
    return (
      <div className='custom-select' style={styles || {}}>
        <div
          className={`select-selected ${show ? 'select-selected-open' : ''}`}
          onClick={this.handleClick}
        >
          {this.renderSelectedValue()}
        </div>
        <div className={`select-items ${show ? 'select-show' : 'select-hide'}`}>
          {items.map(item => (
            <div
              className='d-flex' style={{
                justifyContent: 'space-between'
              }} key={item.id} onClick={() => this.onClickItem(item)}
            >
              <span>{item.title}</span>
              {this.isSelected(item.id, selectedKeys) &&
                <i
                  className='icon-material-outline-check' style={{
                    color: 'blue',
                    fontSize: '1.2em',
                    marginTop: 2
                  }}
                />}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
