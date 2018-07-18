import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Roll, Stop, Score, Turn, Scores } from '../components'
import { getGameThunk } from '../store'

class Game extends Component {

  componentDidMount = () => {
    const { getGame, match } = this.props
    const gameId = match.params.id
    getGame(gameId)
  }

  render() {
    return (
      <div id="game">
        <Dice />
        <Score />
        <div style={{ display: `inline-flex` }}>
          <Roll />
          <Stop />
        </div>
        <Scores />
      </div>
    )
  }
  // <Turn />
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => {
      dispatch(getGameThunk(gameId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
