import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Roll, Stop, Score, FillOrBust, Scores } from '../components'
import { fetchGame } from '../store'

class Game extends Component {

  componentDidMount = () => {
    const { getGame, match } = this.props
    const gameId = match.params.id
    getGame(gameId)
  }

  render() {
    const { turn, players } = this.props
    return (
      <div>
        <Dice dice={turn.dice}/>
        <Roll dice={turn.dice} />
        <Stop />
        <Score turn={turn.score} />
        <FillOrBust fillOrBust={[turn.fill, turn.bust]} />
        <Scores players={players} />
      </div>
    )
  }
}

const mapState = state => {
  const { turn, players } = state
  return { turn, players }
}

const mapDispatch = dispatch => {
  return {
    getGame: gameId => {
      dispatch(fetchGame(gameId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))