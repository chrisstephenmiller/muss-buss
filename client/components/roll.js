import React from 'react'
import { connect } from 'react-redux'
import { rollDice, fetchTurn } from '../store';

const Roll = props => {
  const { game, dice, roll } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => roll(game, dice)}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    roll: (game, dice) => {
      dispatch(rollDice(game, dice))
      dispatch(fetchTurn(game))
    }
  }
}

export default connect(mapState, mapDispatch)(Roll)