import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'
import { toggleDice } from '../store'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Dice = props => {
  const { dice, toggleDie } = props
  return (
    <div style={{ display: `flex`, flexDirection: `column` }} >
      <div style={{ display: `flex` }}>
        {dice.sort(sortById).map((die => {
          return <Die key={die.id}
            die={die}
            onClick={() => toggleDie(dice, die)} />
        }))}
      </div>
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: (dice, die) => {
      if (die.pointer && !die.scored) {
        die.held = !die.held
        dispatch(toggleDice([...dice]))
      }
    },
  }
}

export default connect(mapState, mapDispatch)(Dice)