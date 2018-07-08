import React from 'react'
import { connect } from 'react-redux'
import { rollDice } from '../store';

const Roll = props => {
  const { game, roll } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => roll(game.id)}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    roll: gameId => {
      dispatch(rollDice(gameId))
    }
  }
}

export default connect(mapState, mapDispatch)(Roll)