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
    const { game, rollDice, drawCard, stopTurn, passTurn, match } = this.props
    const { players } = game
    const currentPlayer = players[game.currentPlayer]
    const turn = currentPlayer.turns[0]
    const card = turn && turn.cards[0]
    const roll = card && card.rolls[0]
    const dice = roll ? roll.dice : []
    const gameId = match.params.id
    const lastPlayer = players[(game.currentPlayer + players.length - 1) % players.length]
    if (lastPlayer.turns.length > 1 && lastPlayer.turns[1].cards[0].bust && !card) console.log(`PLAYER ${lastPlayer.id} BUSTED`)
    return (
      <div id="game">
        <Scores players={players} />
        <Dice dice={dice} />
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
    getGame: gameId => {
      dispatch(getGameThunk(gameId))
    },
    rollDice: gameId => {
      dispatch(rollDiceThunk(gameId))
    },
    drawCard: gameId => {
      dispatch(drawCardThunk(gameId))
    },
    stopTurn: gameId => {
      dispatch(stopTurnThunk(gameId))
    },
    passTurn: gameId => {
      dispatch(passTurnThunk(gameId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Game))
