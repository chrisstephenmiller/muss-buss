import React from 'react'
import { connect } from 'react-redux'
import { Die, Roll, Score } from '../components'
import { getDice } from '../store';

const Dice = props => {

  const { game, dice, toggleDie, roll } = props
  return (
    <div style={{ display: `flex` }}>
      {dice.map((die => {
        return <Die key={die.id}
          die={die}
          onClick={() => toggleDie(dice, die)} />
      }))}
      <Roll />
    </div>
  )
}

const mapState = state => {
  const { dice, game } = state
  return { dice, game }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: (dice, die) => {
      if (die.pointer && !die.scored) {
        die.held = !die.held
        dispatch(getDice([...dice]))
      }
    },
  }
}

export default connect(mapState, mapDispatch)(Dice)