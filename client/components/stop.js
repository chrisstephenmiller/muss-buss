import React from 'react'
import { connect } from 'react-redux'
import { endTurn } from '../store';

const Stop = props => {

  const { stop, game } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button" onClick={() => stop(game.id, game.currentPlayer)}>STOP</button>
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    stop: async (gameId, playerId) => {
      await dispatch(endTurn(gameId, playerId))
    }
  }
}

export default connect(mapState, mapDispatch)(Stop)