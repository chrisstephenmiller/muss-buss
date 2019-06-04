import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Dice, Scores } from '../components'
import { getGameThunk, rollDiceThunk, drawCardThunk, stopTurnThunk, passTurnThunk } from '../store'

class Game extends Component {

  componentDidMount() {
    const { getGame, match } = this.props
    const gameId = match.params.id
    getGame(gameId)
  }

  render() {
    const { game, match, rollDice, drawCard, stopTurn, passTurn } = this.props
    const gameId = match.params.id
    const { players, dice, card, currentPlayer } = game
    return (
      <div id="game">
        <Scores players={players} currentPlayer={currentPlayer} />
        <Dice dice={dice} />
        <h1>{card ? card.type: 'No Card'} </h1>
        <h1 onClick={() => rollDice(gameId)}>ROLL</h1>
        <h1 onClick={() => drawCard(gameId)}>DRAW</h1>
        <h1 onClick={() => stopTurn(gameId)}>STOP</h1>
        <h1 onClick={() => passTurn(gameId)}>PASS</h1>
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
    getGame: gameId => dispatch(getGameThunk(gameId)),
    rollDice: gameId => dispatch(rollDiceThunk(gameId)),
    drawCard: gameId => dispatch(drawCardThunk(gameId)),
    stopTurn: gameId => dispatch(stopTurnThunk(gameId)),
    passTurn: gameId => dispatch(passTurnThunk(gameId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
