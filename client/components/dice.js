import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Dice = props => {
  const { email } = props

  return (
    <div>
      <img src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${1}-256.png`} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Dice)