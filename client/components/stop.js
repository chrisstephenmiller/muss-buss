import React from 'react'
import { connect } from 'react-redux'
import { stopTurn, fetchPlayers, createDice, fetchTurn } from '../store';

const Stop = props => {

  const { stop, game } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => stop(game.currentPlayer)}>STOP</button>
    </div>
  )
}

const mapState = state => {
  const { dice, game } = state
  return { dice, game }
}

const mapDispatch = dispatch => {
  return {
    stop: async playerId => {
      await dispatch(stopTurn(playerId))
      await dispatch(fetchPlayers())
      await dispatch(createDice(1, 1))
      await dispatch(fetchTurn(1))
    }
  }
}

export default connect(mapState, mapDispatch)(Stop)