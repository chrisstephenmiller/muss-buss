import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { newGame, newPlayers, startTurn } from '../store';

class Game extends Component {
  componentDidMount = async () => {
    const { startGame, createPlayers, game } = this.props
    await startGame()
    console.log(game)
    await createPlayers([`chris`, `john`, `peter`], game.id)
    await startTurn
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapState = state => {
  const { game } = state
  return { game }
}

const mapDispatch = dispatch => {
  return {
    startGame: async winScore => { await dispatch(newGame(winScore)) }, 
    createPlayers: async players => { await dispatch(newPlayers(players)) }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))