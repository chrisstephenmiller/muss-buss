import React from 'react'
import { connect } from 'react-redux'
import { rollDice, newDice } from '../store';

const Roll = props => {
  const { game, dice, roll } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => roll(game.id, dice)}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { game, dice } = state
  return { game, dice }
}

const mapDispatch = dispatch => {
  return {
    roll: (gameId, dice) => {

      dispatch(dice.length ? rollDice(gameId) : newDice(gameId))
    }
  }
}

export default connect(mapState, mapDispatch)(Roll)