import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'
import { toggleDieThunk } from '../store'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Dice = props => {
  const { dice, toggleDie, turn } = props
  return (
      <div style={{ display: `flex` }}>
        {dice.sort(sortById).map((die => {
          return <Die key={die.id}
            die={die}
            turn={turn}
            onClick={() => toggleDie(die)} />
        }))}
    </div>
  )
}

const mapState = state => {
  const { dice, turn } = state
  return { dice, turn }
}

const mapDispatch = dispatch => {
  return {
    toggleDie: die => {
      if (die.pointer) {
        dispatch(toggleDieThunk(die))
      }
    },
  }
}

export default connect(mapState, mapDispatch)(Dice)
