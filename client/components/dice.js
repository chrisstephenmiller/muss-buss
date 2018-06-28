import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'
import { getDice, rollDice } from '../store';

const Dice = props => {

  const { dice, toggleDie, throwDice } = props
  return (
    <div style={{ display: `flex` }}>
      {dice.map((die => {
        return <Die key={die.id}
          die={die}
          onClick={() => toggleDie(dice, die)} />
      }))}
      <span onClick={() => throwDice(dice)}>ROLL</span>
    </div>
  )
}

const mapState = state => {
  return { dice: state.dice }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: (dice, die) => {
      if (die.pointer && die.status !== `banked`) {
        die.status = die.status === `live` ? `held` : `live`
        const newDice = [...dice]
        dispatch(getDice(newDice))
      }
    },
    throwDice: dice => {
      dispatch(rollDice(dice))
    }
  }
}

export default connect(mapState, mapDispatch)(Dice)