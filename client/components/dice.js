import React from 'react'
import { connect } from 'react-redux'
import { Die } from '../components'
import { toggleDieThunk } from '../store'

const sortById = (dieA, dieB) => dieA.id - dieB.id

const Dice = props => {
  const { dice, toggleDie } = props
  return (
    <div style={{ display: `flex`, flexDirection: `column` }} >
      <div style={{ display: `flex` }}>
        {dice.sort(sortById).map((die => {
          return <Die key={die.id}
            die={die}
            onClick={() => toggleDie(die)} />
        }))}
      </div>
    </div>
  )
}

const mapState = state => {
  const { dice } = state
  return { dice }
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