import React from 'react'

const Button = props => {
  const { text, invalidAction, onClickFunc, gameId } = props
  const hotOrCold = invalidAction ? '' : `button-hot`
  return <span className={`button ${hotOrCold}`} onClick={() => onClickFunc(gameId)}>{text}</span>
}

export default Button
