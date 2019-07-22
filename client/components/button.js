import React, { Component } from 'react'

class Button extends Component {

  render() {
    const { text, invalidAction, onClick } = this.props
    const hotOrCold = invalidAction ? '' : `button-hot`
    return <span className={`button ${hotOrCold}`} onClick={onClick}>{text}</span>
  }
}

export default Button
