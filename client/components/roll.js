import React from 'react'
import { connect } from 'react-redux'
import { rollDiceThunk, newDiceThunk } from '../store';

const Roll = props => {
  const { game, dice, players, user, rollDice } = props
  const currentPlayer = players.find(player => player.id === game.currentPlayer)
  // const permission = currentPlayer && currentPlayer.userId === user.id
  const permission = true
  return (
    <div style={{ display: `flex` }}>
      <button type="button"
        style={{ height: 50, width: 100, margin: 10, borderRadius: 5, fontSize: 20, border: `1px solid black` }}
        onClick={() => { if (permission) rollDice(game.id, dice) }}>ROLL</button>
    </div>
  )
}

const mapState = state => {
  const { game, dice, players, user } = state
  return { game, dice, players, user }
}

const mapDispatch = dispatch => {
  return { rollDice: (gameId, dice) => dispatch(dice.length ? rollDiceThunk(gameId) : newDiceThunk(gameId)) }
}

export default connect(mapState, mapDispatch)(Roll)
