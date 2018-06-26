import React from 'react'
import { connect } from 'react-redux'

import die from '../die.png'

export const Dice = props => {

  const { dice } = props

  return (
    <div>
      <img src={die} />
    </div>
  )
}

const mapState = state => {
  return { dice: state.dice }
}

export default connect(mapState)(Dice)