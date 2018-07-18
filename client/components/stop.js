import React from 'react'
import { connect } from 'react-redux'
import { passDiceThunk } from '../store';

const Stop = props => {

  const { nextPlayer, game } = props
  return (
    <div style={{ display: `flex` }}>
      <button type="button"
        style={{ height: 50, width: 100, margin: 10, borderRadius: 5, fontSize: 20, border: `1px solid black`}}
        onClick={() => nextPlayer(game.id)}>STOP</button>
    </div>
  )
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    nextPlayer: async gameId => {
      await dispatch(passDiceThunk(gameId))
    }
  }
}

export default connect(mapState, mapDispatch)(Stop)
