import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Roll, Stop, Score, Turn, Scores } from '../components'
import { fetchGame } from '../store'

class Game extends Component {

  componentDidMount = () => {
    const { getGame, match } = this.props
    const gameId = match.params.id
    getGame(gameId)
  }

  render() {
    return (
      <div>
        <Dice />
        <Roll />
        <Stop />
        <Score />
        <Turn />
        <Scores/>
      </div>
    )
  }
}

const mapState = state => {
  const { turn } = state
  return { turn }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => {
      dispatch(fetchGame(gameId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))