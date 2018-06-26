import React from 'react'
import { connect } from 'react-redux'

import d1 from '../../assets/d1.png'
import d2 from '../../assets/d2.png'
import d3 from '../../assets/d3.png'
import d4 from '../../assets/d4.png'
import d5 from '../../assets/d5.png'
import d6 from '../../assets/d6.png'

export const Dice = props => {

  const { dice } = props
  const dieImages = [d1, d2, d3, d4, d5, d6]
  return (
    <div>
      {dice.map((die, idx) => {
        return (
          <img src={dieImages[die.value - 1]}
            alt={`die-${die.value}`}
            key={die.id} />
        )
      })}
    </div>
  )
}

const mapState = state => {
  return { dice: state.dice }
}

export default connect(mapState)(Dice)