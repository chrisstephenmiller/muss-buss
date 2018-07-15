import React from 'react'
import { connect } from 'react-redux'
import { rollDiceThunk, newDiceThunk } from '../store';

const Roll = props => {
  const { game, dice, rollDice } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => rollDice(game.id, dice)}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { game, dice } = state
  return { game, dice }
}

const mapDispatch = dispatch => {
  return { rollDice: (gameId, dice) => dispatch(dice.length ? rollDiceThunk(gameId) : newDiceThunk(gameId)) }
}

export default connect(mapState, mapDispatch)(Roll)