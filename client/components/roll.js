import React from 'react'
import { connect } from 'react-redux'
import { rollDice, fetchTurn } from '../store';

const Roll = props => {

  const { game, dice, roll } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => roll(game.id, 1, dice)}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { dice, game } = state
  return { dice, game }
}

const mapDispatch = dispatch => {
  return {
    roll: async (gameId, playerId, dice) => {
      await dispatch(rollDice(gameId, playerId, dice))
      await dispatch(fetchTurn())
    }
  }
}

export default connect(mapState, mapDispatch)(Roll)