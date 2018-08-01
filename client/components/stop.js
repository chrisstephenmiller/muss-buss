import React from 'react'
import { connect } from 'react-redux'
import { passDiceThunk } from '../store';

const Stop = props => {

  const { nextPlayer, game, players, user } = props
  const currentPlayer = players.find(player => player.id === game.currentPlayer)
  // const permission = currentPlayer && currentPlayer.userId === user.id
  const permission = true
  return (
    <div style={{ display: `flex` }}>
      <button type="button"
        style={{ height: 50, width: 100, margin: 10, borderRadius: 5, fontSize: 20, border: `1px solid black` }}
        onClick={() => { if (permission) nextPlayer(game.id) }}>STOP</button>
    </div>
  )
}

const mapState = state => {
  const { game, players, user } = state
  return { game, players, user }
}

const mapDispatch = dispatch => {
  return {
    nextPlayer: async gameId => {
      await dispatch(passDiceThunk(gameId))
    }
  }
}

export default connect(mapState, mapDispatch)(Stop)
