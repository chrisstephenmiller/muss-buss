import React, { Component } from 'react'

class Button extends Component {

  render() {
    const { text, action } = this.props
    const hotOrCold = action ? '' : `button-hot`
    return <h1 className={`button ${hotOrCold}`}>{text}</h1>
  }
}

export default Button
